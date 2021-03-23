+++
title = "Member guide"
weight = 20
+++

[//]: # (Please keep in sync with the readme template at workspace_git_provider.go until it is moved to a file)

A workspace member shares the cluster with other tenants and has a restricted ability to manage resources. This limited access to the cluster is provided via the workspace's ServiceAccount.

## How to deploy a workload using GitOps

Clone the workspace repository and commit and push your deployment.

```bash
git add deployment.yaml
git commit --message "Adds deployment"
git push
```

The cluster will momentarily sync any changes to the repo, adding or removing resources as needed.

Make sure that the `namespace` of the deployment or any other resource in git repository is a namespace managed by this workspace.

## Which namespaces does a Workspace manage?

These are set by the cluster admin and can be seen by getting the specific workspace object:

```bash
kubectl --kubeconfig foo-workspace-kubeconfig get workspace foo-workspace -n wkp-workspaces -oyaml
```

## Accessing the workspace via kubectl

A cluster administrator can provide a _kubeconfig_ file to manage the resources of a specific workspace. This file
contains the credentials of the Workspace's `ServiceAccount` that can be used by `kubectl`.

```bash
kubectl --kubeconfig foo-workspace-kubeconfig get pods
```

The kubeconfig file sets the default namespace to the first namespace the Workspace manages. Other namespaces can be
accessed by using the namespace flag: `--namespace foo-namespace-2`.

## Notes

A current limitation of the Workspace Controller is its inability to apply an _empty_
repository to a cluster. If you have deployments and other manifests commited to this repository,
and then _delete all of them_ so there are 0 manifests left, then the apply will fail and the
resources will not be removed from the cluster. You can either: 

1. Ask your admin to delete the workspace if you are done with it.
2. Add a dummy *ConfigMap* after deleting everything else so that you have at least 1 manifest to apply.
