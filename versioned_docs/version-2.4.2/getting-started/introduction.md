---
title: "Introduction"
---

The Weave Kubernetes Platform (WKP) tool `wk` creates production ready clusters with ease.
WKP facilitates GitOps: all configuration is in files which can be kept under version control.

Depending on your requirements and how much infrastructure you already have in place you can choose a WKP `track`:

- [`track: wks-ssh`]({{< ref "/deploying-wkp/cluster-creation-on-ssh-nodes" >}}) - you have some existing machines and would like to install a Kubernetes cluster and cluster components onto them.
- [`track: wks-components`]({{< ref "/deploying-wkp/components-on-existing-cluster" >}}) - you have an existing Kubernetes cluster and would like to install the cluster components.
- [`track: eks`]({{< ref "/deploying-wkp/cluster-creation-on-eks" >}}) - WKP will create an EKS cluster and install cluster components.
- [`track: wks-footloose`]({{< ref "/deploying-wkp/cluster-creation-on-footloose" >}}) - [footloose](https://github.com/weaveworks/footloose) will be used to create virtual machines locally and then install a Kubernetes cluster and cluster components.
