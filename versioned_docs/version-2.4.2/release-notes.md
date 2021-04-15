---
title: "Release Notes"
---

WKP v2.4.2. is a patch release adding experimental EKS-d support, upgrading team workspace flux, and fixing the bugs listed below.

## Supported versions of Kubernetes

WKP v2.4.2 supports the following versions of Kubernetes by track:

- `wks-ssh`, `wks-footloose` and `wks-components` tracks: v1.16 to v1.20
- On the `eks` track: v1.16 to v1.18

Versions v1.14 and v1.15 are deprecated.

Any patch version of the supported minor versions can be upgraded to, using the `wk` CLI or the UI. The selected version is validated by querying the corresponding kubectl download URL. This check can be skipped by passing the `--skip-check-exists` flag in the `wk upgrade` command

## Known Issues

- This version uses flux v1.17.1 to reconcile the cluster repository, as it is the last version of flux that garbage collects objects with owner references [fluxcd/flux#2749](https://github.com/fluxcd/flux/pull/2749). Also, objects with owner references are excluded from Flux discovery to avoid conflicts between Flux GC and Kubernetes GC. `Machine` and `ExistingInfraMachine` objects have owner refs and are also reconciled. Moving to flux2 should fix this issue and is the way forward in the future.
- [WKP-1478] - Repaving of nodes in a multi control plane cluster is only supported when using a control plane load balancer.
- Occasionally, after a Kubernetes version upgrade takes place, the flux pod running in the `wkp-flux` namespace may not start. If that happens, delete the failing pod and ensure that the new pods start successfully.
- [WKP-1054] - Kubelet service failed to start on machine reboot
- [WKP-1488] - Cluster version not displayed in WKP UI using ssh track
- [WKP-1571] - weavek8sops/flux exists after cluster creation has finished
- [WKP-1623] - WKP cluster helm operator can be used by a team workspace to take over the cluster
- [WKP-1971] - Updates to docker config in cluster.yaml does not have any effect. A workaround to fix the problem is changing the setup/docker-config.yaml and setup/cluster.yaml files at the same time and pushing the change.
- [WKP-1989] WKP fails to re-add a deleted node

## Changes by kind

**Story**
* [WKP-1646] - Expose EKS-d distribution flavor as an experimental feature
* [WKP-1693] - Generate 2.4.2 release
* [WKP-1756] - Support for Kubernetes 1.20
* [WKP-1782] - Automate ssh key test cases from regression sheet
* [WKP-1956] - regression testing 2.4.2

**Bug**
* [WKP-1054] - Kubelet service failed to start on machine reboot
* [WKP-1283] - Add pre-flight check for over-ridden clusterComponents image
* [WKP-1487] - Running `wk kubeconfig` fails with default parameter values
* [WKP-1562] - Workspace workload update fails to reconcile
* [WKP-1567] - K8s version upgrade in the UI doesn't update the cluster.yaml or config.yaml files
* [WKP-1572] - incorrect environment setting for wks-controller
* [WKP-1573] - Cluster won't see changes to existinginfracluster object without updating config map
* [WKP-1754] - Team workspaces need git branch and path in the CRD
* [WKP-1886] - Example for adding machine missing cluster-name label
* [WKP-1954] - WKP fails to apply changes to cluster nodes
