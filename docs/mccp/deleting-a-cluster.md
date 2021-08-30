---
title: Deleting a Cluster
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
And add values for the following command options:
- `pr-repo`: The repository to open a pull request against
- `pr-base`: The base branch to open the pull request against
- `pr-branch`: The branch to create the pull request from
- `pr-title`: The title of the pull request
- `pr-description`: The description of the pull request
- `pr-commit-message`: The commit message to use when deleting the clusters

Merge the PR to delete the clusters.

### Notes
A current limitation is the inability to apply an _empty_ repository to a cluster. If you have capi clusters and other manifests commited to this repository, and then _delete all of them_ so there are 0 manifests left, then the apply will fail and the resources will not be removed from the cluster.
1. Ask your admin to delete the cluster if you are done with it.
2. Add a dummy *ConfigMap* after deleting everything else so that you have at least 1 manifest to apply.