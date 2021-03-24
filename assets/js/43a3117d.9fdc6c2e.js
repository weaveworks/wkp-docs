(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{125:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(o,".").concat(d)]||u[d]||b[d]||l;return n?r.a.createElement(m,i(i({ref:t},s),{},{components:n})):r.a.createElement(m,i({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},89:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),l=(n(0),n(125)),o={title:"Installing WKP to EKS"},i={unversionedId:"deploying-wkp/cluster-creation-on-eks",id:"deploying-wkp/cluster-creation-on-eks",isDocsHomePage:!1,title:"Installing WKP to EKS",description:"Install the dependencies",source:"@site/docs/deploying-wkp/cluster-creation-on-eks.md",slug:"/deploying-wkp/cluster-creation-on-eks",permalink:"/wkp-docs/docs/deploying-wkp/cluster-creation-on-eks",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/deploying-wkp/cluster-creation-on-eks.md",version:"current",sidebar:"docs",previous:{title:"Install to an Existing Cluster",permalink:"/wkp-docs/docs/deploying-wkp/components-on-existing-cluster"},next:{title:"Creating Clusters on SSH Nodes",permalink:"/wkp-docs/docs/deploying-wkp/cluster-creation-on-ssh-nodes"}},c=[{value:"Install the dependencies",id:"install-the-dependencies",children:[]},{value:"Entitlements",id:"entitlements",children:[]},{value:"Install WKP on an EKS cluster",id:"install-wkp-on-an-eks-cluster",children:[]},{value:"Access the WKP UI",id:"access-the-wkp-ui",children:[]},{value:"Specifications of managed nodegroups",id:"specifications-of-managed-nodegroups",children:[]},{value:"Node Requirements",id:"node-requirements",children:[]},{value:"Delete a WKP cluster",id:"delete-a-wkp-cluster",children:[]}],s={toc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h3",{id:"install-the-dependencies"},"Install the dependencies"),Object(l.b)("p",null,"On the computer that will be used for the installation, you need to install:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"https://www.atlassian.com/git/tutorials/install-git"},"git")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/"},"kubectl")),Object(l.b)("li",{parentName:"ul"},"The ",Object(l.b)("inlineCode",{parentName:"li"},"wk")," binary. You can ensure it is in your path by running ",Object(l.b)("inlineCode",{parentName:"li"},"wk version"))),Object(l.b)("h3",{id:"entitlements"},"Entitlements"),Object(l.b)("p",null,"Ensure that ",Object(l.b)("inlineCode",{parentName:"p"},"wk")," can load a valid ","[entitlements]",'({{< ref "/getting-started/entitlements" >}}) file.'),Object(l.b)("h3",{id:"install-wkp-on-an-eks-cluster"},"Install WKP on an EKS cluster"),Object(l.b)("p",null,"First, create a directory which will contain the cluster management scripts and binaries."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},'mkdir wkp-eks-cluster && cd wkp-eks-cluster\n{{<param "clicmd" >}} setup install --entitlements=/path/to/my/entitlements\n')),Object(l.b)("p",null,"The main configuration file will be unpacked at ",Object(l.b)("inlineCode",{parentName:"p"},"setup/config.yaml"),"."),Object(l.b)("p",null,"The required values are your git provider organization or user, your Docker Hub user, and an absolute path to a file containing your Docker Hub password:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"mkdir -p ~/.wks\necho 'my-dockerhub-password' > ~/.wks/dockerhub-password\nchmod 600 ~/.wks/dockerhub-password\n")),Object(l.b)("p",null,"Enter your ",Object(l.b)("inlineCode",{parentName:"p"},"gitProvider"),", ",Object(l.b)("inlineCode",{parentName:"p"},"gitProviderOrg"),", ",Object(l.b)("inlineCode",{parentName:"p"},"dockerIOUser"),", and ",Object(l.b)("inlineCode",{parentName:"p"},"dockerIOPasswordFile")," in your ",Object(l.b)("inlineCode",{parentName:"p"},"setup/config.yaml"),". (See ","[Git Config Repository]",'({{< ref "/getting-started/git-config-repository" >}}) for details about git parameters)'),Object(l.b)("p",null,"Set the ",Object(l.b)("inlineCode",{parentName:"p"},"track")," field to ",Object(l.b)("inlineCode",{parentName:"p"},"eks"),", and optionally, set the ",Object(l.b)("inlineCode",{parentName:"p"},"clusterName"),", ",Object(l.b)("inlineCode",{parentName:"p"},"clusterRegion"),", and ",Object(l.b)("inlineCode",{parentName:"p"},"kubernetesVersion")," fields."),Object(l.b)("p",null,"The WKP UI is not publicly accessible by default. If you want to expose it via an Application Load Balancer, set the ",Object(l.b)("inlineCode",{parentName:"p"},"uiALBIngress")," field to ",Object(l.b)("inlineCode",{parentName:"p"},"true"),"."),Object(l.b)("p",null,"Finally, enter any node group configuration you may require:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"vim setup/config.yaml\n")),Object(l.b)("p",null,"Example snippet of ",Object(l.b)("inlineCode",{parentName:"p"},"config.yaml"),":"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-yaml"},"track: eks\nclusterName: my-cluster\ngitProvider: gitlab\ngitUrl: git@git.acme.org:app-team/dev-cluster.git\ndockerIOUser: my-docker-user\ndockerIOPasswordFile: /home/my-user/.wks/my-dockerhub-password\n")),Object(l.b)("p",null,"WKP uses a personal access token to create the cluster repository on GitHub. The token needs to have permissions in\nthe ",Object(l.b)("inlineCode",{parentName:"p"},"repo")," scope. The github documentation on how to create one can be found on this ",Object(l.b)("a",{parentName:"p",href:"https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token"},"page"),". Once you have created one,\nset the environment variable for it:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"export GITHUB_TOKEN=my-token\n")),Object(l.b)("p",null,"Finally, make sure your AWS CLI credentials are ",Object(l.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html"},"configured properly"),"."),Object(l.b)("p",null,"Now we are ready to install the cluster:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"wk setup run\n")),Object(l.b)("h3",{id:"access-the-wkp-ui"},"Access the WKP UI"),Object(l.b)("h4",{id:"via-wk-ui-command"},"via wk ui command"),Object(l.b)("p",null,"To expose the WKP UI via wk ui command, run:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"wk ui\n")),Object(l.b)("p",null,"You should now be able to view it at ",Object(l.b)("a",{parentName:"p",href:"http://localhost:8090"},"http://localhost:8090")),Object(l.b)("p",null,"To expose the WKP UI to a different port other than the default, run:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"wk ui --port 8081\n")),Object(l.b)("h4",{id:"via-application-load-balancer"},"via Application Load Balancer"),Object(l.b)("p",null,"Ensure that the ",Object(l.b)("inlineCode",{parentName:"p"},"uiALBIngress")," field is set to ",Object(l.b)("inlineCode",{parentName:"p"},"true"),":"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-yaml"},"eksConfig:\n  uiALBIngress: true\n")),Object(l.b)("p",null,"To access the WKP UI via its assigned ingress, get the allocated address:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"kubectl get ingress --namespace wkp-ui wkp-ui-alb-ingress\nNAME                 HOSTS   ADDRESS                        PORTS   AGE\nwkp-ui-alb-ingress   *       my-wkp-cluster.mycompany.com   80      7m5s\n")),Object(l.b)("p",null,"and navigate to it from your browser."),Object(l.b)("p",null,"In this example the address is ",Object(l.b)("inlineCode",{parentName:"p"},"my-wkp-cluster.mycompany.com"),"."),Object(l.b)("h3",{id:"specifications-of-managed-nodegroups"},"Specifications of managed nodegroups"),Object(l.b)("p",null,"The specifications of the managed nodegroups of the cluster can be specified in a YAML file."),Object(l.b)("p",null,"An example file can be seen below:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-yaml"},"managedNodeGroups:\n  - name: managed-1\n    instanceType: m5.large\n    minSize: 2\n    desiredCapacity: 3\n    maxSize: 4\n    availabilityZones: ['us-east-2a', 'us-east-2b']\n    volumeSize: 20\n    ssh:\n      allow: true\n      publicKeyPath: ~/.ssh/id_rsa.pub\n    labels: { role: worker }\n    tags:\n      nodegroup-role: worker\n    iam:\n      withAddonPolicies:\n        externalDNS: true\n        certManager: true\n")),Object(l.b)("p",null,"Once created, save it inside of the ",Object(l.b)("inlineCode",{parentName:"p"},"cluster/platform")," directory,\nand set the path, either relative from ",Object(l.b)("inlineCode",{parentName:"p"},"cluster/platform")," or absolute, in your ",Object(l.b)("inlineCode",{parentName:"p"},"setup/config.yaml"),"."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-yaml"},"eksConfig:\n  nodeGroups: []\n  managedNodeGroupFile: managedNodeGroups.yaml\n")),Object(l.b)("h3",{id:"node-requirements"},"Node Requirements"),Object(l.b)("p",null,"Clusters can run on a single node or multiple, depending on the processing requirements.\nThe default node group WKP will deploy on EKS, is of instance type m5.large.\nA ",Object(l.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#before-you-begin"},"recommended minimum")," for nodes is 2 CPU cores and 2GB of RAM."),Object(l.b)("p",null,"If you are building a large cluster the ",Object(l.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/setup/best-practices/cluster-large/"},"Kubernetes docs")," cover the specifications."),Object(l.b)("p",null,"Recommended instance types for AWS:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"1-5 nodes: m3.medium"),Object(l.b)("li",{parentName:"ul"},"6-10 nodes: m3.large"),Object(l.b)("li",{parentName:"ul"},"11-100 nodes: m3.xlarge"),Object(l.b)("li",{parentName:"ul"},"101-250 nodes: m3.2xlarge"),Object(l.b)("li",{parentName:"ul"},"251-500 nodes: c4.4xlarge"),Object(l.b)("li",{parentName:"ul"},"more than 500 nodes: c4.8xlarge")),Object(l.b)("h3",{id:"delete-a-wkp-cluster"},"Delete a WKP cluster"),Object(l.b)("p",null,"You can use the ",Object(l.b)("inlineCode",{parentName:"p"},"cleanup.sh")," script:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},'./setup/cleanup.sh {{<param "clicmd" >}}\n')))}p.isMDXComponent=!0}}]);