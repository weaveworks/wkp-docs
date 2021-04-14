---
title: "Known Issues and Work Arounds"
---

- Cluster creation with Kubernetes 1.16.1 fails. **Avoid creating clusters on 1.16.1 and use a later version instead.**
- Upgrading Kubernetes 1.19.1 to any of 1.19.2, 1.19.3 or 1.19.4 (the latest as of writing) fails. **Avoid creating clusters on 1.19.1 and use a later version instead.** _Please contact support if this is not an option._
- Upgrading from Kubernetes 1.16.x to 1.17.x sometimes stalls. If after upgrading the first control plane node the upgrade process hangs you may be experiencing this issue. The kubelet logs of the stalled control plane node will show:

  > `KubeletNotReady Failed to initialize CSINodeInfo: error updating CSINode annotation: timed out waiting for the condition; caused by: the server could not find the requested resource`

  A workaround to this could be editing the end of `/var/lib/kubelet/config.yaml` as follows on each of the stalled control plane nodes:

  ```
  featureGates:
    CSIMigration: false
  ```

  More details can be found here: https://github.com/kubernetes/kubernetes/issues/86094
- Docker Desktop for Mac requires specifying the service and pod CIDR blocks. See [Cluster creation on footloose](/deploying-wkp/cluster-creation-on-footloose.md).
