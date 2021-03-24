---
title: "Frequently Asked Questions"
---

**Question**: How many master nodes should I create?

**Answer**: The main reason to create a multi-master cluster is to survive a master node going down. `wk` starts an etcd instance on each master node, the number of master nodes is mostly influenced by etcd and its need for a quorum. A cluster with 3 master nodes will be able to survive 1 master failure while a cluster with 5 master nodes will survive 2 master failures. For more information, consult the [etcd FAQ](https://coreos.com/etcd/docs/latest/faq.html).

**Question**: What are the recommended resources for my nodes?

**Answer**: Master nodes don't need much resources: we recommend 2 vCPUs, 8GB of RAM and 32GB of disk space. Worker nodes can be provisioned keeping in mind the workloads that the cluster will need to run. For instance, Weaveworks uses worker nodes with 16 vCPUs, 32GB of RAM and 160GB of disk space.

**Question**: What to do when facing problems while running `wk ui`?

**Answer**: To expose the WKP UI, `wk ui` uses kubectl port forwarding. You can try running the command as follows for more errors to be displayed as to why wk ui is not working:

```bash
kubectl port-forward --namespace wkp-ui svc/wkp-ui-nginx-ingress-controller 8090:80
```

You should now be able to view it at <http://localhost:8090>
