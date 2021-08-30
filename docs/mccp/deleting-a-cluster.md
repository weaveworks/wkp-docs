---
title: Deleting a Cluster
---

## Deleting a Cluster

### How to: delete a cluster using UI

- Select the cluster clusters you want to delete
- Press `CREATE A PR TO DELETE CLUSTERS` button
- Update the deletion PR values or leave the default values
- Press `Remove clusters from the MCCP` button
- Merge the create PR for clusters deletion

### How to: delete a cluster using CLI

To delete a cluster or clusters using cli run:
```
mccp clusters delete <cluster-name>
```

Merge the PR to delete the clusters.

### Notes
A current limitation is the inability to apply an _empty_ repository to a cluster. If you have deployments and other manifests commited to this repository, and then _delete all of them_ so there are 0 manifests left, then the apply will fail and the resources will not be removed from the cluster. You can either:
1. Ask your admin to delete the cluster if you are done with it.
2. Add a dummy *ConfigMap* after deleting everything else so that you have at least 1 manifest to apply.