---
title: "Cluster Node Requirements"
---

The cluster nodes on which Kubernetes is going to be installed when deploying WKP on the `wks-ssh` track,
have a set of requirements.

### Host OS

`wk` supports the following host OSes:

- CentOS 7.4
- CentOS 7.5
- CentOS 7.6
- RHEL 7.4
- RHEL 7.5
- RHEL 7.6
- Ubuntu 18.04
- Ubuntu 20.04

### SSH User

In addition, hosts need to have:

- SSH access
- A user able to login with SSH and with password-less sudo permissions

### Network Ports

Finally, ensure that the following ports are open on the hosts:

- 6443 (kubernetes api server)
- 2379-2380 (etcd)
- 6783-6784 (weave net)
- 10250 (container logs)
- 32000-32767 (node ports)
