---
title: "Connecting Clusters"
---


To connect a cluster to the multi-cluster control plane (MCCP), first navigate to the `Clusters` section of the WKP UI and click on the `Connect a cluster` button. You will then be presented with a form to add the details of the leaf cluster being connected. 
- Name: this is the name of the leaf cluster. This is a required field.
- Ingress URL: this is the publicly accessible HTTP(S) endpoint of the leaf cluster. This is an optional field.

Click on the `Save & next` button to persist these details. You will then be presented with a `kubectl` command that you can run to install an agent on your leaf cluster. The agent is responsible for inspecting the leaf cluster and sending back leaf information to the MCCP server. It will not make any changes to your cluster. 

Ensure that your current kubeconfig context is setup to use the leaf cluster. Then copy the command and run it. 

After a few seconds, the status of your cluster should change to `Connected (Ready)` which indicates that the leaf cluster has been successfully connected.

:::info
> **Note:** You may need to add an additional ingress rule for `/gitops/api/agent.yaml` to ensure that this path does not require authentication. The manifest below shows how to add this rule.
:::

```
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
  name: wkp-ui-agent-no-auth
  namespace: wkp-ui
spec:
  rules:
  - host: <hostname-to-use> # e.g. app.wkp.weave.works
    http:
      paths:
      - path: /gitops/api/agent.yaml
        backend:
          serviceName: wkp-ui-nginx-ingress-controller
          servicePort: 80
  tls:
  - hosts:
    - <hostname-to-use> # e.g. app.wkp.weave.works
    secretName: wkp-tls
```



## How to: Update a cluster

To update a cluster, click on the rightmost icon of that cluster's row. You will be presented with a form that allows you to update its name and ingress URL. Finally click on the `Save & next` button to persist these changes.