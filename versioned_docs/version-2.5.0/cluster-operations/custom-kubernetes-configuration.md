---
title: "Customizing the API Server and Kubelet"
---

### Providing extra arguments to the API server and kubelet

Certain tasks, such as setting up an `OIDC` server, require passing extra arguments to either the `kube-apiserver` process, the `kubelet` process, or both. You can provide these arguments in the `config.yaml` file for your cluster. In the `wksConfig` section, there are two fields:
* [apiServerArguments](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/#options)
* [kubeletArguments](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/#options)

Each has the same format -- an array of `name/value` pairs. All values are strings:

```yaml
apiServerArguments:
- name: alsologtostderr
  value: 'true'
- name: audit-log-maxsize
  value: '10000'

kubeletArguments:
- name: alsologtostderr
  value: 'true'
- name: container-runtime
  value: docker
```

Any arguments specified here will be provided to the respective processes. `apiServerArguments` will be passed to the `kube-apiserver` process on each control plane node and `kubeletArguments` will be passed to the `kubelet` process on each node in the cluster.
