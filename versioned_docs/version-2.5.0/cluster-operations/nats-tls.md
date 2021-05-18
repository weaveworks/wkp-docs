---
title: "Securing NATS"
---

NATS is a messaging server used by the MCCP component. It exposes a TCP endpoint that needs to be reachable by WKP agents running on leaf clusters. This guide describes how to use TLS to secure traffic between leaf clusters and the MCCP server. This guide uses `cert-manager` to generate the certificate but it still applies and can be used without it. It is highly recommended to enable TLS connections for NATS _before_ adding any leaf clusters to MCCP, otherwise you may need to re-connect any leaf clusters that were added prior to enabling TLS.

Setting up TLS for NATS requires the use of a certificate. This certificate can be added to the cluster either manually as a secret or provisioned automatically via `cert-manager`.The following manifest shows how to provision such a certificate automatically.

```yaml
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: nats-tls
  namespace: wkp-gitops-repo-broker
spec:
  dnsNames:
  - <hostname-to-use> # e.g. mccp.wkp.weave.works
  issuerRef:
    group: cert-manager.io
    kind: <issuer-type> # Issuer or ClusterIssuer
    name: <issuer-name> # the name of an existing Issuer or ClusterIssuer
  secretName: nats-tls
  usages:
  - digital signature
  - key encipherment
```

Add this manifest to the directory `./cluster/manifests/mccp` of your cluster repository, then commit and push to your Git provider. The reconciliation process should apply it within a few seconds. Ensure that the certificate has been successfully provisioned by running the following command.

```console
kubectl get secrets -n wkp-gitops-repo-broker nats-tls
```

Once the new certificate has been provisioned, we need to update the NATS configuration to use it. Update the ConfigMap manifest located in `./cluster/manifests/mccp/extra-nats-values-configmap.yaml` which is used for configuring NATS with the following content.

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: extra-nats-values
data:
  values.yaml: |
    auth:
      enabled: true
      user: ''
      token: $NATS_AUTH_TOKEN
    client:
      service:
        type: NodePort
    extraEnvVarsSecret: nats-env-vars-secret
    extraFlags:
      tls: ""
      tlskey: /etc/nats-tls/tls.key
      tlscert: /etc/nats-tls/tls.crt
    extraVolumeMounts:
    - name: nats-tls
      mountPath: /etc/nats-tls/
      readOnly: true
    extraVolumes:
    - name: nats-tls
      secret:
        secretName: nats-tls
```

This will result in exposing the TLS certificate as a mounted volume so that it is accessible under the `/etc/nats-tls` directory of the NATS container. The `extraFlags` configuration that is supplied instructs NATS to require TLS for client connections.

After this change is applied, NATS will be accessible only via TLS connections. We need to also update `./cluster/platform/components.js` to ensure that new agents being created for leaf cluster will get the correct (TLS-enabled) connection details and to ensure that the event-writer component running on the MCCP server itself will also connect to NATS via a TLS connection.

To update the agent template, edit the following section of `./cluster/platform/components.js` to set the scheme to `tls` and the URL to the public endpoint that NATS is exposed for the `wkp-gitops-repo-broker` cluster component.

```diff
const wkpGitopsRepoBroker = {
	"name": "wkp-gitops-repo-broker",
	"params": {
		"git": gitopsParams.git,
		"gitDeployKey": gitopsSecrets.sealedGitDeployKey["wkp-gitops-repo-broker"],
		"imagePullSecret": gitopsSecrets.sealedImagePullSecrets.dockerio["wkp-gitops-repo-broker"],
		"images": gitopsParams.images,
		"featureGates": enabledFeatures,
		"agentTemplate": {
			// nats or tls
-			"natsScheme": "nats",
-			"natsURL": "nats-client.wkp-gitops-repo-broker:4222",
+			"natsScheme": "tls",
+			"natsURL": "<hostname-to-use>", # e.g. mccp.wkp.weave.works:4222",
		},
		dbConfig,
	},
}
```

Similarly, to update the event-writer component, edit the following section `./cluster/platform/components.js` to set the scheme to `tls` and the URL to the public endpoint that NATS is exposed for the `wkp-mccp` cluster component.

```diff
const wkpMccp = {
  name: 'wkp-mccp',
  disabled: !enabledFeatures.fleetManagement,
  params: {
    dbConfig,
    // Over-ride the event-write connection
-   natsScheme: 'nats',
-   natsURL: 'nats-client.wkp-gitops-repo-broker:4222',
+   natsScheme: 'tls',
+   natsURL: '<hostname-to-use>', # e.g. mccp.wkp.weave.works:4222",
  },
};
```

Now both components should be able to talk to NATS using a TLS connection.