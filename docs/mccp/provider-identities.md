---
title: CAPI Provider Identities
---

## Multi-tenancy

Some Cluster API providers allow you to choose the account or identity that the new cluster will be created with. This is often referred to as _Multi-tenancy_ in the CAPI world. MCCP currently supports:

- [Cluster API Provider AWS multi-tenancy](https://cluster-api-aws.sigs.k8s.io/topics/multitenancy.html)
- [Cluster API Provider Azure multi-tenancy](https://capz.sigs.k8s.io/topics/multitenancy.html)
- [Cluster API Provider vSphere multi-tenancy](https://github.com/kubernetes-sigs/cluster-api-provider-vsphere/blob/master/docs/identity_management.md)

### `identityRef`s

The above providers support multi-tenancy by setting an `identityRef` on the the provider cluster object, e.g. `AWSCluster`, `AzureCluster` or `VSphereCluster`.

Add the list of objects to be rendered out to the `spec.resourcetemplates` section.

### Parameter metadata - `spec.params`

You can provide additional metadata about the parameters to the templates in the `spec.params` section.

- `name`: The variable name within the resource templates
- `descripton`: Description of the parameter. This will be rendered in the UI and CLI
- `options`: The list of possible values this parameter can be set to.

### Loading the template into the cluster

Load templates into the cluster by adding them to your flux managed git repository or by apply directly with
`kubectl apply -f capi-template.yaml`

The MCCP will search for templates in the `default` namespace. This can be changed by configuring the `config.capi.namespace` value in the helm chart.

## Full CAPD docker template example

This example works with the CAPD provider, see [Cluster API Providers](cluster-api-providers.md).

```yaml
apiVersion: capi.weave.works/v1alpha1
kind: CAPITemplate
metadata:
  name: cluster-template-development
spec:
  description: This is the std. CAPD template
  params:
    - name: CLUSTER_NAME
      description: This is used for the cluster naming.
    - name: NAMESPACE
      description: Namespace to create the cluster in
    - name: KUBERNETES_VERSION
      description: Namespace to create the cluster in
      options: ['1.19.7', '1.19.8']
  resourcetemplates:
    - apiVersion: cluster.x-k8s.io/v1alpha3
      kind: Cluster
      metadata:
        name: '${CLUSTER_NAME}'
        namespace: '${NAMESPACE}'
      spec:
        clusterNetwork:
          pods:
            cidrBlocks:
              - 192.168.0.0/16
          serviceDomain: cluster.local
          services:
            cidrBlocks:
              - 10.128.0.0/12
        infrastructureRef:
          apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
          kind: DockerCluster
          name: '${CLUSTER_NAME}'
          namespace: '${NAMESPACE}'
        controlPlaneRef:
          kind: KubeadmControlPlane
          apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
          name: '${CLUSTER_NAME}-control-plane'
          namespace: '${NAMESPACE}'
    - apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
      kind: DockerCluster
      metadata:
        name: '${CLUSTER_NAME}'
        namespace: '${NAMESPACE}'
    - apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
      kind: DockerMachineTemplate
      metadata:
        name: '${CLUSTER_NAME}-control-plane'
        namespace: '${NAMESPACE}'
      spec:
        template:
          spec:
            extraMounts:
              - containerPath: '/var/run/docker.sock'
                hostPath: '/var/run/docker.sock'
    - kind: KubeadmControlPlane
      apiVersion: controlplane.cluster.x-k8s.io/v1alpha3
      metadata:
        name: '${CLUSTER_NAME}-control-plane'
        namespace: '${NAMESPACE}'
      spec:
        replicas: 1
        infrastructureTemplate:
          kind: DockerMachineTemplate
          apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
          name: '${CLUSTER_NAME}-control-plane'
          namespace: '${NAMESPACE}'
        kubeadmConfigSpec:
          clusterConfiguration:
            controllerManager:
              extraArgs: { enable-hostpath-provisioner: 'true' }
            apiServer:
              certSANs: [localhost, 127.0.0.1]
          initConfiguration:
            nodeRegistration:
              criSocket: /var/run/containerd/containerd.sock
              kubeletExtraArgs:
                eviction-hard: 'nodefs.available<0%,nodefs.inodesFree<0%,imagefs.available<0%'
          joinConfiguration:
            nodeRegistration:
              criSocket: /var/run/containerd/containerd.sock
              kubeletExtraArgs:
                eviction-hard: 'nodefs.available<0%,nodefs.inodesFree<0%,imagefs.available<0%'
        version: '${KUBERNETES_VERSION}'
    - apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
      kind: DockerMachineTemplate
      metadata:
        name: '${CLUSTER_NAME}-md-0'
        namespace: '${NAMESPACE}'
      spec:
        template:
          spec: {}
    - apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
      kind: KubeadmConfigTemplate
      metadata:
        name: '${CLUSTER_NAME}-md-0'
        namespace: '${NAMESPACE}'
      spec:
        template:
          spec:
            joinConfiguration:
              nodeRegistration:
                kubeletExtraArgs:
                  eviction-hard: 'nodefs.available<0%,nodefs.inodesFree<0%,imagefs.available<0%'
    - apiVersion: cluster.x-k8s.io/v1alpha3
      kind: MachineDeployment
      metadata:
        name: '${CLUSTER_NAME}-md-0'
        namespace: '${NAMESPACE}'
      spec:
        clusterName: '${CLUSTER_NAME}'
        replicas: 1
        selector:
          matchLabels:
        template:
          spec:
            clusterName: '${CLUSTER_NAME}'
            version: '${KUBERNETES_VERSION}'
            bootstrap:
              configRef:
                name: '${CLUSTER_NAME}-md-0'
                namespace: '${NAMESPACE}'
                apiVersion: bootstrap.cluster.x-k8s.io/v1alpha3
                kind: KubeadmConfigTemplate
            infrastructureRef:
              name: '${CLUSTER_NAME}-md-0'
              namespace: '${NAMESPACE}'
              apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
              kind: DockerMachineTemplate
```
