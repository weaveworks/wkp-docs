---
title: "Introduction"
---

The Weave Kubernetes Platform (WKP) tool `wk` creates production ready clusters with ease.
WKP facilitates GitOps: all configuration is in files which can be kept under version control.

Depending on your requirements and how much infrastructure you already have in place you can choose a WKP `track`:

- [`track: wks-ssh`](../deploying-wkp/cluster-creation-on-ssh-nodes.md) - you have some existing machines and would like to install a Kubernetes cluster and cluster components onto them.
- [`track: wks-components`](../deploying-wkp/components-on-existing-cluster.md) - you have an existing Kubernetes cluster and would like to install the cluster components.
- [`track: eks`](../deploying-wkp/cluster-creation-on-eks.md) - WKP will create an EKS cluster and install cluster components.
- [`track: wks-footloose`](../deploying-wkp/cluster-creation-on-footloose.md) - [footloose](https://github.com/weaveworks/footloose) will be used to create virtual machines locally and then install a Kubernetes cluster and cluster components.
