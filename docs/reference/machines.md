+++
title = "machines.yaml"
+++

The machines manifest is the a list of `Machine` objects describing the nodes
of the Kubernetes cluster.

```yaml
---
apiVersion: cluster.x-k8s.io/v1alpha3
kind: Machine
metadata:
  labels:
    set: master
  name: master-35.195.66.60
  namespace: weavek8sops
spec:
  clusterName: my-wkp-cluster
  version: 1.19.3
  infrastructureRef:
    apiVersion: "cluster.weave.works/v1alpha3"
    kind: ExistingInfraMachine
    name: master-35.195.66.60
  bootstrap: {}
---
apiVersion: "cluster.weave.works/v1alpha3"
kind: "ExistingInfraMachine"
metadata:
  name: master-35.195.66.60
  namespace: weavek8sops
  labels:
    cluster.x-k8s.io/cluster-name: my-wkp-cluster
spec:
  private:
    address: 10.132.0.21
    port: 22
  public:
    address: 35.195.66.60
    port: 22
```

Here is the list of valid fields for `Machine`.

* `metadata.name` - use the `name` field if you want to explicitly
  name each of your machines.
* `metadata.labels` - a map of (key, value) pairs of labels to assign to the
  host.

CIDR format: a network address followed by a slash `/` and a bit
count.  Example: 192.168.2.0/24 - the network part of the address is
24 bits long, leaving 8 bits for host addresses.
