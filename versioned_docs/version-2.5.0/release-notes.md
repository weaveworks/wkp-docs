---
title: "Release Notes"
---

WKP v2.5.0 is a feature release, adding the new Multi-Cluster Control Plane component, full `eksctl` config support (including creating clusters in pre-existing VPCs) and a new and improved documentation portal.

## Introducing the Multi-Cluster Control Plane (MCCP)

The MCCP allows cluster operators to attach and control observability components to any Kubernetes cluster (AKS, EKS, GKE, OpenShift, Tanzu or self hosted) and gain instant full-stack understandings. The MCCP is a single pane of glass, operational dashboard and observability layer across your entire fleet of Kubernetes clusters and workloads -- fully integrated into corporate SSO.

## Full eksctl config support

WKP now allows you to configure all aspects of your EKS clusters via `eksctl`s config format. For example you can now specify a pre-existing VPC to launch your cluster into. Check out the [eks track docs](https://docs.wkp.weave.works/docs/deploying-wkp/cluster-creation-on-eks) for details!

## New documentation portal

We're excited to announce the new WKP documentation portal at https://docs.wkp.weave.works/ . This will allow us to provide more up to date guides and information so you and your team can get the most out of WKP!

## Details

### Supported versions of Kubernetes

WKP v2.5.0 supports the following versions of Kubernetes by track:

- `wks-ssh`, `wks-footloose` and `wks-components` tracks: v1.16 to v1.20
- `eks`: v1.16 to v1.19

### Version bumps

- `eksctl` to`0.43.0`
- `prometheus-operator` to `v2.26.0`
- `nginx-ingress-controller` to `0.44.0`
- `wksctl` to `0.10.2`
- `capei` to `0.2.5`
- `aws-load-balancer-controller` to `2.1.3`

### Known issues

- If you don't [label a node](https://docs.wkp.weave.works/docs/mccp/usage-guide) during MCCP configuration clusters will confusingly not connect.
- This version uses flux v1.17.1 to reconcile the cluster repository, as it is the last version of flux that garbage collects objects with owner references fluxcd/flux#2749. Also, objects with owner references are excluded from Flux discovery to avoid conflicts between Flux GC and Kubernetes GC. Machine and ExistingInfraMachine objects have owner refs and are also reconciled. Moving to flux2 should fix this issue and is the way forward in the future.
- [[`WKP-1478`](https://weaveworks.atlassian.net/browse/WKP-1478
)] - Repaving of nodes in a multi control plane cluster is only supported when using a control plane load balancer.
- [[`WKP-1571`](https://weaveworks.atlassian.net/browse/WKP-1571
)] - weavek8sops/flux occasionally exists after cluster creation has finished, its deployment should be manually deleted.
- [[`WKP-1623`](https://weaveworks.atlassian.net/browse/WKP-1623
)] - WKP cluster helm operator can be used by a team workspace to take over the cluster.
- [[`WKP-1971`](https://weaveworks.atlassian.net/browse/WKP-1971
)] - Updates to docker config in cluster.yaml does not have any effect. A workaround to fix the problem is changing the setup/docker-config.yaml and setup/cluster.yaml files at the same time and pushing the change.
