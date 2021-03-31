(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{148:function(e,n,o){"use strict";o.r(n),o.d(n,"frontMatter",(function(){return a})),o.d(n,"metadata",(function(){return s})),o.d(n,"toc",(function(){return l})),o.d(n,"default",(function(){return i}));var r=o(3),t=o(7),c=(o(0),o(170)),a={title:"cluster.yaml"},s={unversionedId:"reference/cluster",id:"version-2.4.2/reference/cluster",isDocsHomePage:!1,title:"cluster.yaml",description:"The Cluster object defines the cluster-global configuration.",source:"@site/versioned_docs/version-2.4.2/reference/cluster.md",slug:"/reference/cluster",permalink:"/docs/reference/cluster",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/reference/cluster.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Cluster and Machine Objects",permalink:"/docs/reference/reference"},next:{title:"machines.yaml",permalink:"/docs/reference/machines"}},l=[],d={toc:l};function i(e){var n=e.components,o=Object(t.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},d,o,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The Cluster object defines the cluster-global configuration."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: cluster.x-k8s.io/v1alpha3\nkind: Cluster\nmetadata:\n  name: updated-deps-77\n  namespace: weavek8sops\nspec:\n  clusterNetwork:\n    services:\n      cidrBlocks: [10.96.0.0/12]\n    pods:\n      cidrBlocks: [192.168.0.0/16]\n    serviceDomain: cluster.local\n  infrastructureRef:\n    apiVersion: "cluster.weave.works/v1alpha3"\n    kind: ExistingInfraCluster\n    name: updated-deps-77\n---\napiVersion: cluster.weave.works/v1alpha3\nkind: "ExistingInfraCluster"\nmetadata:\n  name: updated-deps-77\n  namespace: weavek8sops\nspec:\n      user: wks\n      kubernetesVersion: 1.18.10\n      apiServer:\n        extraArguments: []\n      kubeletArguments: []\n      controlPlaneMachineCount: "1"\n      workerMachineCount: "1"\n      os:\n        files:\n        - source:\n            configmap: repo\n            key: kubernetes.repo\n            contents: |\n                [kubernetes]\n                name=Kubernetes\n                baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64\n                enabled=1\n                gpgcheck=1\n                repo_gpgcheck=1\n                gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg\n                exclude=kube*\n          destination: /etc/yum.repos.d/kubernetes.repo\n        - source:\n            configmap: repo\n            key: docker-ce.repo\n            contents: |\n                [docker-ce-stable]\n                name=Docker CE Stable - $basearch\n                baseurl=https://download.docker.com/linux/centos/7/$basearch/stable\n                enabled=1\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-stable-debuginfo]\n                name=Docker CE Stable - Debuginfo $basearch\n                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/stable\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-stable-source]\n                name=Docker CE Stable - Sources\n                baseurl=https://download.docker.com/linux/centos/7/source/stable\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-edge]\n                name=Docker CE Edge - $basearch\n                baseurl=https://download.docker.com/linux/centos/7/$basearch/edge\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-edge-debuginfo]\n                name=Docker CE Edge - Debuginfo $basearch\n                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/edge\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-edge-source]\n                name=Docker CE Edge - Sources\n                baseurl=https://download.docker.com/linux/centos/7/source/edge\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-test]\n                name=Docker CE Test - $basearch\n                baseurl=https://download.docker.com/linux/centos/7/$basearch/test\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-test-debuginfo]\n                name=Docker CE Test - Debuginfo $basearch\n                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/test\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-test-source]\n                name=Docker CE Test - Sources\n                baseurl=https://download.docker.com/linux/centos/7/source/test\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-nightly]\n                name=Docker CE Nightly - $basearch\n                baseurl=https://download.docker.com/linux/centos/7/$basearch/nightly\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-nightly-debuginfo]\n                name=Docker CE Nightly - Debuginfo $basearch\n                baseurl=https://download.docker.com/linux/centos/7/debug-$basearch/nightly\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n\n                [docker-ce-nightly-source]\n                name=Docker CE Nightly - Sources\n                baseurl=https://download.docker.com/linux/centos/7/source/nightly\n                enabled=0\n                gpgcheck=1\n                gpgkey=https://download.docker.com/linux/centos/gpg\n          destination: /etc/yum.repos.d/docker-ce.repo\n        - source:\n            configmap: repo\n            key: cloud-google-com.gpg.b64\n            contents: |\n                mQENBFUd6rIBCAD6mhKRHDn3UrCeLDp7U5IE7AhhrOCPpqGF7mfTemZYHf/5JdjxcOxoSFlK7zwm\n                Fr3lVqJ+tJ9L1wd1K6P7RrtaNwCiZyeNPf/Y86AJ5NJwBe0VD0xHTXzPNTqRSByVYtdN94NoltXU\n                YFAAPZYQls0x0nUD1hLMlOlC2HdTPrD1PMCnYq/NuL/Vk8sWrcUt4DIS+0RDQ8tKKe5PSV0+Pnma\n                JvdF5CKawhh0qGTklS2MXTyKFoqjXgYDfY2EodI9ogT/LGr9Lm/+u4OFPvmN9VN6UG+s0DgJjWvp\n                bmuHL/ZIRwMEn/tpuneaLTO7h1dCrXC849PiJ8wSkGzBnuJQUbXnABEBAAG0QEdvb2dsZSBDbG91\n                ZCBQYWNrYWdlcyBBdXRvbWF0aWMgU2lnbmluZyBLZXkgPGdjLXRlYW1AZ29vZ2xlLmNvbT6JAT4E\n                EwECACgFAlUd6rICGy8FCQWjmoAGCwkIBwMCBhUIAgkKCwQWAgMBAh4BAheAAAoJEDdGwginMXsP\n                cLcIAKi2yNhJMbu4zWQ2tM/rJFovazcY28MF2rDWGOnc9giHXOH0/BoMBcd8rw0lgjmOosBdM2JT\n                0HWZIxC/Gdt7NSRA0WOlJe04u82/o3OHWDgTdm9MS42noSP0mvNzNALBbQnlZHU0kvt3sV1Ysnrx\n                ljoIuvxKWLLwren/GVshFLPwONjw3f9Fan6GWxJyn/dkX3OSUGaduzcygw51vksBQiUZLCD2Tlxy\n                r9NvkZYTqiaWW78L6regvATsLc9L/dQUiSMQZIK6NglmHE+cuSaoK0H4ruNKeTiQUw/EGFaLecay\n                6Qy/s3Hk7K0QLd+gl0hZ1w1VzIeXLo2BRlqnjOYFX4CwAgADmQENBFrBaNsBCADrF18KCbsZlo4N\n                jAvVecTBCnp6WcBQJ5oSh7+E98jX9YznUCrNrgmeCcCMUvTDRDxfTaDJybaHugfba43nqhkbNpJ4\n                7YXsIa+YL6eEE9emSmQtjrSWIiY+2YJYwsDgsgckF3duqkb02OdBQlh6IbHPoXB6H//b1PgZYsom\n                B+841XW1LSJPYlYbIrWfwDfQvtkFQI90r6NknVTQlpqQh5GLNWNYqRNrGQPmsB+NrUYrkl1nUt1L\n                RGu+rCe4bSaSmNbwKMQKkROE4kTiB72DPk7zH4Lm0uo0YFFWG4qsMIuqEihJ/9KNX8GYBr+tWgyL\n                ooLlsdK3l+4dVqd8cjkJM1ExABEBAAG0QEdvb2dsZSBDbG91ZCBQYWNrYWdlcyBBdXRvbWF0aWMg\n                U2lnbmluZyBLZXkgPGdjLXRlYW1AZ29vZ2xlLmNvbT6JAT4EEwECACgFAlrBaNsCGy8FCQWjmoAG\n                CwkIBwMCBhUIAgkKCwQWAgMBAh4BAheAAAoJEGoDCyG6B/T78e8H/1WH2LN/nVNhm5TS1VYJG8B+\n                IW8zS4BqyozxC9iJAJqZIVHXl8g8a/Hus8RfXR7cnYHcg8sjSaJfQhqO9RbKnffiuQgGrqwQxuC2\n                jBa6M/QKzejTeP0Mgi67pyrLJNWrFI71RhritQZmzTZ2PoWxfv6b+Tv5v0rPaG+ut1J47pn+kYgt\n                UaKdsJz1umi6HzK6AacDf0C0CksJdKG7MOWsZcB4xeOxJYuy6NuO6KcdEz8/XyEUjIuIOlhYTd0h\n                H8E/SEBbXXft7/VBQC5wNq40izPi+6WFK/e1O42DIpzQ749ogYQ1eodexPNhLzekKR3XhGrNXJ95\n                r5KO10VrsLFNd8KwAgAD\n          destination: /tmp/cloud-google-com.gpg.b64\n        - source:\n            configmap: docker\n            key: daemon.json\n            contents: |\n              {\n                "log-driver": "json-file",\n                "log-opts": {\n                  "max-size": "100m"\n                },\n                "exec-opts": [\n                  "native.cgroupdriver=cgroupfs"\n                ]\n              }\n          destination: /etc/docker/daemon.json\n      cri:\n        kind: docker\n        package: docker-ce\n        version: 19.03.8\n')),Object(c.b)("p",null,"Here is the list of valid fields for ",Object(c.b)("inlineCode",{parentName:"p"},"Cluster"),"."),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"spec.clusterNetwork.services.cidrBlocks")," - the address range, in CIDR\nformat, which Kubernetes will use to allocate service IPs. Accepts a\nlist of blocks, although typical clusters will have only one."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"spec.clusterNetwork.pods.cidrBlocks")," - the address range, in CIDR\nformat, which Kubernetes will use to allocate pod IPs. Accepts a\nlist of blocks, although typical clusters will have only one."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"spec.user")," - the username used for login on the\nmachines in the cluster.")))}i.isMDXComponent=!0},170:function(e,n,o){"use strict";o.d(n,"a",(function(){return u})),o.d(n,"b",(function(){return b}));var r=o(0),t=o.n(r);function c(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function a(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?a(Object(o),!0).forEach((function(n){c(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}function l(e,n){if(null==e)return{};var o,r,t=function(e,n){if(null==e)return{};var o,r,t={},c=Object.keys(e);for(r=0;r<c.length;r++)o=c[r],n.indexOf(o)>=0||(t[o]=e[o]);return t}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)o=c[r],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(t[o]=e[o])}return t}var d=t.a.createContext({}),i=function(e){var n=t.a.useContext(d),o=n;return e&&(o="function"==typeof e?e(n):s(s({},n),e)),o},u=function(e){var n=i(e.components);return t.a.createElement(d.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.a.createElement(t.a.Fragment,{},n)}},g=t.a.forwardRef((function(e,n){var o=e.components,r=e.mdxType,c=e.originalType,a=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=i(o),g=r,b=u["".concat(a,".").concat(g)]||u[g]||p[g]||c;return o?t.a.createElement(b,s(s({ref:n},d),{},{components:o})):t.a.createElement(b,s({ref:n},d))}));function b(e,n){var o=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=o.length,a=new Array(c);a[0]=g;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var d=2;d<c;d++)a[d]=o[d];return t.a.createElement.apply(null,a)}return t.a.createElement.apply(null,o)}g.displayName="MDXCreateElement"}}]);