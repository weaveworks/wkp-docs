(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{116:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return p}));var a=t(3),r=t(7),o=(t(0),t(170)),i={title:"Patching Node OS packages"},c={unversionedId:"tasks/patching-node-os-packages",id:"version-2.4.2/tasks/patching-node-os-packages",isDocsHomePage:!1,title:"Patching Node OS packages",description:"OS Patching",source:"@site/versioned_docs/version-2.4.2/tasks/patching-node-os-packages.md",slug:"/tasks/patching-node-os-packages",permalink:"/wkp-docs/docs/tasks/patching-node-os-packages",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/tasks/patching-node-os-packages.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Specifying Multiple Admins",permalink:"/wkp-docs/docs/tasks/multiple-cluster-admins"},next:{title:"Profiling kubectl",permalink:"/wkp-docs/docs/tasks/profiling-kubectl"}},s=[{value:"OS Patching",id:"os-patching",children:[]},{value:"Cluster/Node lifecycle",id:"clusternode-lifecycle",children:[{value:"Patching in-place",id:"patching-in-place",children:[]},{value:"Replace/Cycle nodes",id:"replacecycle-nodes",children:[]}]},{value:"Add/Remove/Drain nodes",id:"addremovedrain-nodes",children:[]}],l={toc:s};function p(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"os-patching"},"OS Patching"),Object(o.b)("p",null,"The machines backing WKP Nodes can be managed at the OS level in several ways.\nWhether you are provisioning the base OS with cloud-init, kickstart, a shell script,\nbaking OS images, or using a configuration-management system like Ansible/Chef/Puppet/Salt,\nthere are some things you will want to consider when patching OS packages in your WKP\ncluster."),Object(o.b)("p",null,"Kubernetes related dependencies such as Docker, Containerd, and the Kubelet are\ndeclaratively managed by the WKS-Controller via the ",Object(o.b)("inlineCode",{parentName:"p"},"Cluster")," ",Object(o.b)("a",{parentName:"p",href:"/wkp-docs/docs/reference/cluster"},Object(o.b)("inlineCode",{parentName:"a"},"ExistingInfraCluster")),".\nThese packages are normally updated with a cluster upgrade.\nIf you find you'd like to patch WKP managed packages out-of-band for a ",Object(o.b)("strong",{parentName:"p"},"bug-fix")," or ",Object(o.b)("strong",{parentName:"p"},"CVE"),",\n",Object(o.b)("em",{parentName:"p"},"please contact WKP Support")," to avoid service disruption."),Object(o.b)("p",null,"Packages such as the OS kernel and SSHD (which is a pre-requisite for the SSH Cluster API Provider)\nare installed beforehand and are not managed by WKP.\nPlease feel free to update these packages in whichever way you see fit.\nYour upstream linux support should provide patches for CVE's in a timely manner."),Object(o.b)("p",null,"Using a git-backed, pull-based configuration management system like Chef, Puppet, or Salt is\nin line with GitOps principles if you have a mutable OS and are patching in-place."),Object(o.b)("h2",{id:"clusternode-lifecycle"},"Cluster/Node lifecycle"),Object(o.b)("p",null,"There are two primary package update strategies. "),Object(o.b)("h3",{id:"patching-in-place"},"Patching in-place"),Object(o.b)("p",null,"You can choose to upgrade your packages by patching them using a package manager like\napt or yum. The WKS-Controller uses this mechanism for cluster upgrades if you are not\ncycling out your Nodes via git.\nUpdating packages in-place can be a great, practical option for large clusters when the\nprovision time for new machines is slow and cluster capacity is inflexible or oversubscribed."),Object(o.b)("p",null,"If a package requires a restart of linux, you may consider tainting or cordoning Nodes\nto prevent kube-scheduler from assigning new Pods to them and draining critical workloads\nbefore issuing a Node restart.\nYou can run ",Object(o.b)("a",{parentName:"p",href:"https://github.com/weaveworks/kured"},"weaveworks/kured")," in the cluster to\nautomate the detection, taint, drain, and reboot process across all Nodes with a\ndeclarative lifecycle."),Object(o.b)("p",null,"If you are looking to patch more quickly, causing a disruption to the Pods on those Nodes\nwith an OS restart may be within your SLAs; for instance, if you have the proper\n",Object(o.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/run-application/configure-pdb/"},Object(o.b)("inlineCode",{parentName:"a"},"PodDisruptionBudgets"))," in place beforehand\nor have redundant routing/load-balancing with circuit breakers, along with zero-downtime\nhandling of Pod Lifecycle",Object(o.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"},"[1]"),"/",Object(o.b)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=0o5C12kzEDI"},"[2]"),",\nyou may observe little to no service disruption."),Object(o.b)("h3",{id:"replacecycle-nodes"},"Replace/Cycle nodes"),Object(o.b)("p",null,"If you have a fast machine provisioner, are baking golden images, or are leveraging\nimmutable infrastructure, replacing and cycling out your Nodes with patched ones may be\nmore appropriate. "),Object(o.b)("p",null,"This procedure is similar to the ",Object(o.b)("inlineCode",{parentName:"p"},"RollingUpdate")," strategy used by the ",Object(o.b)("inlineCode",{parentName:"p"},"Deployment"),"\ncontroller for ",Object(o.b)("inlineCode",{parentName:"p"},"ReplicaSets")," and their ",Object(o.b)("inlineCode",{parentName:"p"},"Pods"),", but carried out instead using sets of Nodes."),Object(o.b)("p",null,"The strategy is to add new Nodes to the cluster using the new base image.\nYou then migrate workloads to them by draining old Nodes.\nOnce the workloads are migrated, you can remove the old Nodes, and repeat the process in phases."),Object(o.b)("p",null,"Having more free or elastic capacity to provision new machines will make rollout of new\nNodes quicker and easier.\nIf you are able to double the cluster capacity temporarily, you can complete this rollout\nin 1 phase."),Object(o.b)("h2",{id:"addremovedrain-nodes"},"Add/Remove/Drain nodes"),Object(o.b)("p",null,"You can ",Object(o.b)("strong",{parentName:"p"},"add")," or ",Object(o.b)("strong",{parentName:"p"},"remove")," cluster Nodes by committing to the ",Object(o.b)("a",{parentName:"p",href:"/wkp-docs/docs/reference/machines"},"Machines manifest"),".",Object(o.b)("br",{parentName:"p"}),"\n","Nodes can be ",Object(o.b)("strong",{parentName:"p"},"tainted")," by committing to that same Machines manifest.\n",Object(o.b)("strong",{parentName:"p"},"taints")," can be used to repel new workloads from the Node."),Object(o.b)("p",null,"Take care to not unintentionally taint, add or remove Nodes in the same commit.\nNew Nodes will need time to provision and become ",Object(o.b)("inlineCode",{parentName:"p"},"Ready"),". They may not provision\nsuccessfully, which can leave new Pods in an unschedulable state. "),Object(o.b)("p",null,"You can drain Nodes using ",Object(o.b)("inlineCode",{parentName:"p"},"kubectl drain"),'.\nThe drain command will "cordon" the Node which marks it as UnSchedulable.\nThis acts similarly to taints, but Pods cannot ignore it.\nSee the ',Object(o.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/"},"Kubernetes docs"),"\nfor notes on Pod Eviction behavior and ",Object(o.b)("inlineCode",{parentName:"p"},"PodDisruptionBudgets"),"."))}p.isMDXComponent=!0},170:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return h}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),p=function(e){var n=r.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},d=function(e){var n=p(e.components);return r.a.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},b=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(t),b=a,h=d["".concat(i,".").concat(b)]||d[b]||u[b]||o;return t?r.a.createElement(h,c(c({ref:n},l),{},{components:t})):r.a.createElement(h,c({ref:n},l))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=b;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=t[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);