(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{153:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),i=n(7),a=(n(0),n(170)),s={title:"Configuring EKS-D"},o={unversionedId:"tasks/using-the-eks-d-distribution",id:"version-2.4.2/tasks/using-the-eks-d-distribution",isDocsHomePage:!1,title:"Configuring EKS-D",description:"What is EKS-D?",source:"@site/versioned_docs/version-2.4.2/tasks/using-the-eks-d-distribution.md",slug:"/tasks/using-the-eks-d-distribution",permalink:"/wkp-docs/docs/tasks/using-the-eks-d-distribution",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/tasks/using-the-eks-d-distribution.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Control Plane Load Balancing",permalink:"/wkp-docs/docs/tasks/control-plane-load-balancers"},next:{title:"Specifying Multiple Admins",permalink:"/wkp-docs/docs/tasks/multiple-cluster-admins"}},l=[{value:"What is EKS-D?",id:"what-is-eks-d",children:[]},{value:"Using EKS-D with WKP",id:"using-eks-d-with-wkp",children:[]},{value:"Limitations",id:"limitations",children:[]}],c={toc:l};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h3",{id:"what-is-eks-d"},"What is EKS-D?"),Object(a.b)("p",null,"Amazon has made the Kubernetes distribution underlying EKS available to run in other environments outside EKS. Becauase of this, it's now possible to run an application in an identical Kubernetes environment, regardless of whether or not it is hosted within AWS. Starting with release 2.4.2, WKP supports creating clusters running EKS-D."),Object(a.b)("h2",{id:"using-eks-d-with-wkp"},"Using EKS-D with WKP"),Object(a.b)("p",null,"The current EKS-D support in WKP is considered experimental and is thus hidden behind an experimental feature flag. In order to enable the feature, you need to set the corresponding flag to 'true'. If there is no ",Object(a.b)("inlineCode",{parentName:"p"},"experimentalFeatures")," section yet in your ",Object(a.b)("inlineCode",{parentName:"p"},"setup/config.yaml")," file, add it below the ",Object(a.b)("inlineCode",{parentName:"p"},"enabledFeatures")," section:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"# Map with WKP features that are enabled in the cluster.\n# To apply changes made here, commit and push the\n# updated config.yaml file to the cluster repository.\nenabledFeatures:\n  teamWorkspaces: false\n# Map with WKP features that are experimental in this release.\n# To apply changes made here, commit and push the\n# updated config.yaml file to the cluster repository.\nexperimentalFeatures:\n  eks-d: true\n")),Object(a.b)("p",null,"Once the feature is enabled, you need to specify threee other things in ",Object(a.b)("inlineCode",{parentName:"p"},"config.yaml"),":"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"kubernetes version 1.18.9 (the only version currently supported for EKS-d)"),Object(a.b)("li",{parentName:"ul"},"the cni (EKS-D expects to run with cilium, while WKP defaults to weave)"),Object(a.b)("li",{parentName:"ul"},'the "flavor" (which variety of Kubernetes to run in the cluster)')),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"wksConfig:\n  # Defines the version of Kubernetes installed on each node.\n  # Must be: `'1.14.x'`-`'1.16.x'`\n  # friendly reminder to use quotes to ensure this value is a YAML string.\n  # [REQUIRED]\n  kubernetesVersion: '1.18.9'\n\n  # Script to install a CNI other than weave net\n  cni: 'kubectl create -f https://raw.githubusercontent.com/cilium/cilium/v1.9/install/kubernetes/quick-install.yaml'\n\n  flavor:\n    name: 'eks-d'\n    manifestURL: 'https://distro.eks.amazonaws.com/kubernetes-1-18/kubernetes-1-18-eks-1.yaml'\n")),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"cni")," field, if present, should contain a bash script that will install the specified CNI (cilium, for EKS-D)."),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"flavor")," field contains two values:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"the flavor name (currently, the only supported flavor is 'eks-d')"),Object(a.b)("li",{parentName:"ul"},"the URL of the manifest that describes the flavor artifacts. This manifest follows the schema that Amazon uses to describe the eks-d distribution. The CRD defining the schema can be found here: ",Object(a.b)("a",{parentName:"li",href:"https://distro.eks.amazonaws.com/releases/v1-18-eks-1/"},"https://distro.eks.amazonaws.com/releases/v1-18-eks-1/"),".")),Object(a.b)("p",null,"With the snippet above added to your ",Object(a.b)("inlineCode",{parentName:"p"},"config.yaml"),", you can create clusters running EKS-D."),Object(a.b)("h2",{id:"limitations"},"Limitations"),Object(a.b)("p",null,"There are two limitations on our initial WKP EKS-D support, both derived from EKS-D limitations:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"EKS-D is only supported for Kubernetes 1.18.9 at the moment (at the present time, amazon only provides 1.18.9)"),Object(a.b)("li",{parentName:"ul"},"EKS-D clusters cannot currently be upgraded (a result of the first limitation)"),Object(a.b)("li",{parentName:"ul"},"The operating system kernel for the machines in the cluster must be >= 4.10 (this means that CentOS 7 will not work)")))}u.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),u=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,h=p["".concat(s,".").concat(b)]||p[b]||d[b]||a;return n?i.a.createElement(h,o(o({ref:t},c),{},{components:n})):i.a.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=b;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<a;c++)s[c]=n[c];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);