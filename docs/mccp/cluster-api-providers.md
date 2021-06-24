# Creating leaf clusters from the MCCP

To enable leaf cluster creation, MCCP leverages the Cluster-API (CAPI) providers for [AWS](https://cluster-api-aws.sigs.k8s.io/getting-started.html) or [Docker](https://cluster-api.sigs.k8s.io/user/quick-start.html).
In this section we cover the steps to deploy the providers on a Kubernetes cluster
that is running the MCCP.

CAPI provides declarative APIs, controllers, and tooling to manage the lifecycle of Kubernetes clusters, across
a large number of [infrastructure providers](https://cluster-api.sigs.k8s.io/reference/providers.html#infrastructure).
The CAPI custom resource definitions are platform independent as each provider implementation handles the creation of VMs, 
VPCs, networks and other required infrastructure parts, enabling consistent and repeatable cluster deployments.
For more information on the CAPI project, refer to the [CAPI book](https://cluster-api.sigs.k8s.io/introduction.html).

## Configure and deploy the CAPI providers

In all cases, CAPI requires kubectl access to an existing Kubernetes cluster, so in our case we configure `kubectl` to use the MCCP cluster.

```bash
export KUBECONFIG=/path/to/mccp/kubeconfig
```

## AWS provider (CAPA)

After having configured `kubectl`, to deploy the CAPA components, follow the steps at https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl

## Docker provider (CAPD)

The Docker infrastructure provider is a reference implementation and is a practical way of testing the MCCP cluster creation 
feature. It is not intended for production clusters.
As CAPD will start docker containers in the host nodes of the MCCP cluster, note that if you are using it with a `kind` 
cluster you'll need to mount the docker socket as described in the [Install and/or configure a kubernetes cluster](https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-andor-configure-a-kubernetes-cluster) kind section.
Similar to the AWS provider case, configure `kubectl` to use the MCCP cluster, and to deploy the CAPD components follow the steps at https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl.
