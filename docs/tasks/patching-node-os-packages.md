+++
title = "Patching node OS packages"
weight = 25
+++

# OS Patching

The machines backing WKP Nodes can be managed at the OS level in several ways.
Whether you are provisioning the base OS with cloud-init, kickstart, a shell script,
baking OS images, or using a configuration-management system like Ansible/Chef/Puppet/Salt, 
there are some things you will want to consider when patching OS packages in your WKP 
cluster.

Kubernetes related dependencies such as Docker, Containerd, and the Kubelet are 
declaratively managed by the WKS-Controller via the `Cluster` [`ExistingInfraCluster`]({{< ref "/reference/cluster" >}}).
These packages are normally updated with a cluster upgrade.
If you find you'd like to patch WKP managed packages out-of-band for a **bug-fix** or **CVE**, 
*please contact WKP Support* to avoid service disruption.

Packages such as the OS kernel and SSHD (which is a pre-requisite for the SSH Cluster API Provider) 
are installed beforehand and are not managed by WKP.
Please feel free to update these packages in whichever way you see fit.
Your upstream linux support should provide patches for CVE's in a timely manner.

Using a git-backed, pull-based configuration management system like Chef, Puppet, or Salt is 
in line with GitOps principles if you have a mutable OS and are patching in-place.


## Cluster/Node Lifecycle

There are two primary package update strategies. 

### Patching in-place

You can choose to upgrade your packages by patching them using a package manager like 
apt or yum. The WKS-Controller uses this mechanism for cluster upgrades if you are not 
cycling out your Nodes via git.
Updating packages in-place can be a great, practical option for large clusters when the 
provision time for new machines is slow and cluster capacity is inflexible or oversubscribed.

If a package requires a restart of linux, you may consider tainting or cordoning Nodes 
to prevent kube-scheduler from assigning new Pods to them and draining critical workloads 
before issuing a Node restart.
You can run [weaveworks/kured](https://github.com/weaveworks/kured) in the cluster to 
automate the detection, taint, drain, and reboot process across all Nodes with a 
declarative lifecycle.

If you are looking to patch more quickly, causing a disruption to the Pods on those Nodes 
with an OS restart may be within your SLAs; for instance, if you have the proper 
[`PodDisruptionBudgets`](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) in place beforehand 
or have redundant routing/load-balancing with circuit breakers, along with zero-downtime 
handling of Pod Lifecycle[[1]](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)/[[2]](https://www.youtube.com/watch?v=0o5C12kzEDI), 
you may observe little to no service disruption.

### Replace/Cycle Nodes

If you have a fast machine provisioner, are baking golden images, or are leveraging 
immutable infrastructure, replacing and cycling out your Nodes with patched ones may be 
more appropriate. 

This procedure is similar to the `RollingUpdate` strategy used by the `Deployment` 
controller for `ReplicaSets` and their `Pods`, but carried out instead using sets of Nodes.

The strategy is to add new Nodes to the cluster using the new base image.
You then migrate workloads to them by draining old Nodes.
Once the workloads are migrated, you can remove the old Nodes, and repeat the process in phases.

Having more free or elastic capacity to provision new machines will make rollout of new 
Nodes quicker and easier.
If you are able to double the cluster capacity temporarily, you can complete this rollout 
in 1 phase.


## Add/Remove/Drain Nodes

You can **add** or **remove** cluster Nodes by committing to the [Machines manifest]({{< ref "/reference/machines" >}}).  
Nodes can be **tainted** by committing to that same Machines manifest.
**taints** can be used to repel new workloads from the Node.

Take care to not unintentionally taint, add or remove Nodes in the same commit. 
New Nodes will need time to provision and become `Ready`. They may not provision 
successfully, which can leave new Pods in an unschedulable state. 

You can drain Nodes using `kubectl drain`.
The drain command will "cordon" the Node which marks it as UnSchedulable.
This acts similarly to taints, but Pods cannot ignore it.
See the [Kubernetes docs](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/) 
for notes on Pod Eviction behavior and `PodDisruptionBudgets`.
