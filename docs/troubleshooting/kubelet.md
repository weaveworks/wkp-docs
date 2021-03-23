+++
title = "Kubelet"
weight = 1
+++

## Troubleshooting kubelet

> _The kubelet is the primary “node agent” that runs on each node._ -- [Kubernetes Docs](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)

### `kubectl` is returning errors

```console
$ kubectl get nodes
The connection to the server 10.247.32.133:6443 was refused - did you specify the right host or port?
```

Either `kubelet` or the `apiserver` isn't running on the main master node.

### Is kubelet running on the nodes?

Check `machines.yaml` for IPs

```console
$ cat ./setup/machines.yaml | grep address | uniq
          address: 10.247.32.133
          address: 10.247.32.134
          address: 10.247.32.135
```

See if kubelet is running

```console
$ ssh centos@10.247.32.133 ps aux|grep kubelet
root     32504  4.9  2.2 970448 80912 ?        Ssl  Jan22  52:26 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/var/lib/kubelet/config.yaml --cgroup-driver=cgroupfs --network-plugin=cni --node-ip=10.247.32.133 --pod-infra-container-image=k8s.gcr.io/pause:3.1 --node-ip=10.247.32.133

$ ssh centos@10.247.32.134 ps aux|grep kubelet

$ ssh centos@10.247.32.135 ps aux|grep kubelet
root     16238  3.8  1.6 748228 68460 ?        Ssl  Jan22  40:14 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/var/lib/kubelet/config.yaml --cgroup-driver=cgroupfs --network-plugin=cni --pod-infra-container-image=k8s.gcr.io/pause:3.1 --node-ip=10.247.32.135
```

**Note**: _When running `ssh` commands above, you might need to replace `centos` with your custom value from `spec.providerSpec.value.user` in `setup/cluster.yaml` and perhaps also pass a private key to your cluster via `-i your_cluster_key`_.

So Kubelet is not running on one of the nodes.

### Try and manually start kubelet

```console
$ ssh centos@10.247.32.134
$ sudo systemctl start kubelet
$ ps aux|grep kubelet

centos    3548  0.0  0.0 112708   948 pts/0    R+   09:46   0:00 grep --color=auto kubelet
```

In this case it is still not starting up.

### Check kubelet logs

```console
$ journalctl -u kubelet

Jan 23 09:47:22 wk-simon-1.maas systemd[1]: Starting kubelet: The Kubernetes Node Agent...
Jan 23 09:47:22 wk-simon-1.maas systemd[1]: Started kubelet: The Kubernetes Node Agent.
Jan 23 09:47:22 wk-simon-1.maas kubelet[3623]: F0123 09:47:22.219308    3623 server.go:198] failed to load Kubelet config file /var/lib/kubelet/config.yaml, error failed to read kubelet config file "/var/lib/kubelet/config.yaml"
Jan 23 09:47:22 wk-simon-1.maas systemd[1]: kubelet.service: main process exited, code=exited, status=255/n/a
Jan 23 09:47:22 wk-simon-1.maas systemd[1]: Unit kubelet.service entered failed state.
Jan 23 09:47:22 wk-simon-1.maas systemd[1]: kubelet.service failed.
```

In this case it can't find a config.
