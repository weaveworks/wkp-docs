+++
title = "Adding and removing nodes"
weight = 2
+++

### Adding a node to the cluster

New nodes can be added to a cluster by appending their specification to the `setup/machines.yaml` file,
which is generated in the cluster directory upon cluster creation.
The file is a YAML list of Machine items as defined in [Cluster-API v1alpha3](https://cluster-api.sigs.k8s.io/developer/architecture/controllers/machine.html).
Adding a new node, which has been setup with the same SSH user and key that was used to create the cluster, comes down to:

- copying another Machine item and setting its name
- ensure the 'cluster.x-k8s.io/cluster-name' label is included when you copy and paste the Machine/ExistingInfraMachine set
- setting its role to `master` or `worker`
- setting its private and public IP addresses.

an example `Machine` item for reference:

```yaml
---
apiVersion: cluster.x-k8s.io/v1alpha3
kind: Machine
metadata:
  labels:
    set: master
    cluster.x-k8s.io/cluster-name: my-wkp-cluster
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

Once the machine(s) have been added to the `machines.yaml`, commit and push the changes to the remote repo.

```bash
git add setup/machines.yaml
git commit -m "Add a new node"
git push origin master
```

The `wks-controller` pod in the `weavek8sops` namespace, will start the process of adding the new node to the cluster.
Progress of the operation can be monitored from its logs.

```bash
kubectl logs --namespace weavek8sops -l name=wks-controller
```

### Removing a node from the cluster

Similar to the process of adding a node to the cluster, just delete the `Machine` and `ExistingInfraMachine` pair corresponding to the node
from the list in `setup/machines.yaml`, and then commit and push to the remote repo.

The `wks-controller` will notice that the machine has been removed and then drain the workload(s) from the node and ultimately remove the node from the cluster.
