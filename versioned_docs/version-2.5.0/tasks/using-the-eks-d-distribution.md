---
title: "Configuring EKS-D"
---

### What is EKS-D?

Amazon has made the Kubernetes distribution underlying EKS available to run in other environments outside EKS. Because of this, it's now possible to run an application in an identical Kubernetes environment, regardless of whether or not it is hosted within AWS. Starting with release 2.4.2, WKP supports creating clusters running EKS-D.

## Using EKS-D with WKP

The current EKS-D support in WKP is considered experimental and is thus hidden behind an experimental feature flag. In order to enable the feature, you need to set the corresponding flag to 'true'. If there is no `experimentalFeatures` section yet in your `setup/config.yaml` file, add it below the `enabledFeatures` section:

```yaml
# Map with WKP features that are enabled in the cluster.
# To apply changes made here, commit and push the
# updated config.yaml file to the cluster repository.
enabledFeatures:
  teamWorkspaces: false
# Map with WKP features that are experimental in this release.
# To apply changes made here, commit and push the
# updated config.yaml file to the cluster repository.
experimentalFeatures:
  eks-d: true
```

Once the feature is enabled, you need to specify threee other things in `config.yaml`:
- kubernetes version 1.18.9 (the only version currently supported for EKS-d)
- the cni (EKS-D expects to run with cilium, while WKP defaults to weave)
- the "flavor" (which variety of Kubernetes to run in the cluster)

```yaml
wksConfig:
  # Defines the version of Kubernetes installed on each node.
  # Must be: `'1.14.x'`-`'1.16.x'`
  # friendly reminder to use quotes to ensure this value is a YAML string.
  # [REQUIRED]
  kubernetesVersion: '1.18.9'

  # Script to install a CNI other than weave net
  cni: 'kubectl create -f https://raw.githubusercontent.com/cilium/cilium/v1.9/install/kubernetes/quick-install.yaml'

  flavor:
    name: 'eks-d'
    manifestURL: 'https://distro.eks.amazonaws.com/kubernetes-1-18/kubernetes-1-18-eks-1.yaml'
```

The `cni` field, if present, should contain a bash script that will install the specified CNI (cilium, for EKS-D).

The `flavor` field contains two values:
- the flavor name (currently, the only supported flavor is 'eks-d')
- the URL of the manifest that describes the flavor artifacts. This manifest follows the schema that Amazon uses to describe the eks-d distribution. The CRD defining the schema can be found here: https://distro.eks.amazonaws.com/releases/v1-18-eks-1/.

With the snippet above added to your `config.yaml`, you can create clusters running EKS-D.

## Limitations

There are two limitations on our initial WKP EKS-D support, both derived from EKS-D limitations:
- EKS-D is only supported for Kubernetes 1.18.9 at the moment (at the present time, amazon only provides 1.18.9)
- EKS-D clusters cannot currently be upgraded (a result of the first limitation)
- The operating system kernel for the machines in the cluster must be >= 4.10 (this means that CentOS 7 will not work)
