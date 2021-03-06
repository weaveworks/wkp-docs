---
title: "cluster.yaml"
---

The Cluster object defines the cluster-global configuration.

```yaml
apiVersion: cluster.x-k8s.io/v1alpha3
kind: Cluster
metadata:
  name: updated-deps-77
  namespace: weavek8sops
spec:
  clusterNetwork:
    services:
      cidrBlocks: [10.96.0.0/12]
    pods:
      cidrBlocks: [192.168.0.0/16]
    serviceDomain: cluster.local
  infrastructureRef:
    apiVersion: "cluster.weave.works/v1alpha3"
    kind: ExistingInfraCluster
    name: updated-deps-77
---
apiVersion: cluster.weave.works/v1alpha3
kind: "ExistingInfraCluster"
metadata:
  name: updated-deps-77
  namespace: weavek8sops
spec:
      user: wks
      kubernetesVersion: 1.18.10
      apiServer:
        extraArguments: []
      kubeletArguments: []
      controlPlaneMachineCount: "1"
      workerMachineCount: "1"
      os:
        files:
        - source:
            configmap: repo
            key: kubernetes.repo
            contents: |
                [kubernetes]
                name=Kubernetes
                baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
                enabled=1
                gpgcheck=1
                repo_gpgcheck=1
                gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
                exclude=kube*
          destination: /etc/yum.repos.d/kubernetes.repo
        - source:
            configmap: repo
            key: docker-ce.repo
            contents: |
                [docker-ce-stable]
                name=Docker CE Stable - $basearch
                baseurl=https://download.docker.com/linux/centos/7/$basearch/stable
                enabled=1
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-stable-debuginfo]
                name=Docker CE Stable - Debuginfo $basearch
                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/stable
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-stable-source]
                name=Docker CE Stable - Sources
                baseurl=https://download.docker.com/linux/centos/7/source/stable
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-edge]
                name=Docker CE Edge - $basearch
                baseurl=https://download.docker.com/linux/centos/7/$basearch/edge
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-edge-debuginfo]
                name=Docker CE Edge - Debuginfo $basearch
                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/edge
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-edge-source]
                name=Docker CE Edge - Sources
                baseurl=https://download.docker.com/linux/centos/7/source/edge
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-test]
                name=Docker CE Test - $basearch
                baseurl=https://download.docker.com/linux/centos/7/$basearch/test
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-test-debuginfo]
                name=Docker CE Test - Debuginfo $basearch
                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/test
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-test-source]
                name=Docker CE Test - Sources
                baseurl=https://download.docker.com/linux/centos/7/source/test
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-nightly]
                name=Docker CE Nightly - $basearch
                baseurl=https://download.docker.com/linux/centos/7/$basearch/nightly
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-nightly-debuginfo]
                name=Docker CE Nightly - Debuginfo $basearch
                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/nightly
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg

                [docker-ce-nightly-source]
                name=Docker CE Nightly - Sources
                baseurl=https://download.docker.com/linux/centos/7/source/nightly
                enabled=0
                gpgcheck=1
                gpgkey=https://download.docker.com/linux/centos/gpg
          destination: /etc/yum.repos.d/docker-ce.repo
        - source:
            configmap: repo
            key: cloud-google-com.gpg.b64
            contents: |
                mQENBFUd6rIBCAD6mhKRHDn3UrCeLDp7U5IE7AhhrOCPpqGF7mfTemZYHf/5JdjxcOxoSFlK7zwm
                Fr3lVqJ+tJ9L1wd1K6P7RrtaNwCiZyeNPf/Y86AJ5NJwBe0VD0xHTXzPNTqRSByVYtdN94NoltXU
                YFAAPZYQls0x0nUD1hLMlOlC2HdTPrD1PMCnYq/NuL/Vk8sWrcUt4DIS+0RDQ8tKKe5PSV0+Pnma
                JvdF5CKawhh0qGTklS2MXTyKFoqjXgYDfY2EodI9ogT/LGr9Lm/+u4OFPvmN9VN6UG+s0DgJjWvp
                bmuHL/ZIRwMEn/tpuneaLTO7h1dCrXC849PiJ8wSkGzBnuJQUbXnABEBAAG0QEdvb2dsZSBDbG91
                ZCBQYWNrYWdlcyBBdXRvbWF0aWMgU2lnbmluZyBLZXkgPGdjLXRlYW1AZ29vZ2xlLmNvbT6JAT4E
                EwECACgFAlUd6rICGy8FCQWjmoAGCwkIBwMCBhUIAgkKCwQWAgMBAh4BAheAAAoJEDdGwginMXsP
                cLcIAKi2yNhJMbu4zWQ2tM/rJFovazcY28MF2rDWGOnc9giHXOH0/BoMBcd8rw0lgjmOosBdM2JT
                0HWZIxC/Gdt7NSRA0WOlJe04u82/o3OHWDgTdm9MS42noSP0mvNzNALBbQnlZHU0kvt3sV1Ysnrx
                ljoIuvxKWLLwren/GVshFLPwONjw3f9Fan6GWxJyn/dkX3OSUGaduzcygw51vksBQiUZLCD2Tlxy
                r9NvkZYTqiaWW78L6regvATsLc9L/dQUiSMQZIK6NglmHE+cuSaoK0H4ruNKeTiQUw/EGFaLecay
                6Qy/s3Hk7K0QLd+gl0hZ1w1VzIeXLo2BRlqnjOYFX4CwAgADmQENBFrBaNsBCADrF18KCbsZlo4N
                jAvVecTBCnp6WcBQJ5oSh7+E98jX9YznUCrNrgmeCcCMUvTDRDxfTaDJybaHugfba43nqhkbNpJ4
                7YXsIa+YL6eEE9emSmQtjrSWIiY+2YJYwsDgsgckF3duqkb02OdBQlh6IbHPoXB6H//b1PgZYsom
                B+841XW1LSJPYlYbIrWfwDfQvtkFQI90r6NknVTQlpqQh5GLNWNYqRNrGQPmsB+NrUYrkl1nUt1L
                RGu+rCe4bSaSmNbwKMQKkROE4kTiB72DPk7zH4Lm0uo0YFFWG4qsMIuqEihJ/9KNX8GYBr+tWgyL
                ooLlsdK3l+4dVqd8cjkJM1ExABEBAAG0QEdvb2dsZSBDbG91ZCBQYWNrYWdlcyBBdXRvbWF0aWMg
                U2lnbmluZyBLZXkgPGdjLXRlYW1AZ29vZ2xlLmNvbT6JAT4EEwECACgFAlrBaNsCGy8FCQWjmoAG
                CwkIBwMCBhUIAgkKCwQWAgMBAh4BAheAAAoJEGoDCyG6B/T78e8H/1WH2LN/nVNhm5TS1VYJG8B+
                IW8zS4BqyozxC9iJAJqZIVHXl8g8a/Hus8RfXR7cnYHcg8sjSaJfQhqO9RbKnffiuQgGrqwQxuC2
                jBa6M/QKzejTeP0Mgi67pyrLJNWrFI71RhritQZmzTZ2PoWxfv6b+Tv5v0rPaG+ut1J47pn+kYgt
                UaKdsJz1umi6HzK6AacDf0C0CksJdKG7MOWsZcB4xeOxJYuy6NuO6KcdEz8/XyEUjIuIOlhYTd0h
                H8E/SEBbXXft7/VBQC5wNq40izPi+6WFK/e1O42DIpzQ749ogYQ1eodexPNhLzekKR3XhGrNXJ95
                r5KO10VrsLFNd8KwAgAD
          destination: /tmp/cloud-google-com.gpg.b64
        - source:
            configmap: docker
            key: daemon.json
            contents: |
              {
                "log-driver": "json-file",
                "log-opts": {
                  "max-size": "100m"
                },
                "exec-opts": [
                  "native.cgroupdriver=cgroupfs"
                ]
              }
          destination: /etc/docker/daemon.json
      cri:
        kind: docker
        package: docker-ce
        version: 19.03.8
```

Here is the list of valid fields for `Cluster`.

* `spec.clusterNetwork.services.cidrBlocks` - the address range, in CIDR
  format, which Kubernetes will use to allocate service IPs. Accepts a
  list of blocks, although typical clusters will have only one.
* `spec.clusterNetwork.pods.cidrBlocks` - the address range, in CIDR
  format, which Kubernetes will use to allocate pod IPs. Accepts a
  list of blocks, although typical clusters will have only one.
* `spec.user` - the username used for login on the
  machines in the cluster.
