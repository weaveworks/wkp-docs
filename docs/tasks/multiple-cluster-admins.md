---
title: "Specifying Multiple Admins"
---

A WKP cluster can be operated by multiple adminstrators, given that they have the same version of the `wk` binary installed, and they have read and write permissions to the cluster repository.

There are certain files, created during the cluster bootstrapping, that are not pushed to the remote repository, and therefore not accessible to other administrators.
A full list of non-committed files that affect operations follows:

- The generated `KUBECONFIG` for the cluster
- The ssh private key file set in the `sshKeyFile` field of `setup/config.yaml`
- The file containing the docker.io password, set in `dockerIOPasswordFile`
- The deploy key pair of the git repository `setup/repo-key-<cluster-name>[.pub]`
- The sealed secrets private key `setup/sealed-secrets-key`
- The binaries contained in the `bin` directory

While some operations can still be performed with the above missing, specifically:

- Adding and removing nodes, by editing the `setup/machines.yaml` file
- Deploying workloads by commiting manifests in the `cluster/manifests` directory.

To query the status of pods and the results of operations, a `KUBECONFIG` file will need to be
regenerated for the new environment. To generate the new `KUBECONFIG`, the following files will need to be shared from the original machine:

- The ssh key file in the `sshKeyFile` field of `setup/config.yaml`
- The file containing the docker.io password, set in `dockerIOPasswordFile`

Once the files are in place, generate the `KUBECONFIG` with:

`wk kubeconfig --cluster=<path-to-cluster.yaml> --machines=<path-to-machines.yaml> --ssh-key=<path-to-ssh-key>`

At this point an administrator can run any post-installation operation on the WKP cluster from the new machine, as described in sections:

[Cluster Operations]({{< ref "/cluster-operations/upgrading-kubernetes-version" >}})\
[Running User Workloads]({{< ref "/cluster-operations/user-workloads" >}})
