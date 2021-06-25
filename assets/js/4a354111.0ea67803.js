(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{121:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),a=(r(0),r(214)),i={title:"Cluster API Providers"},c={unversionedId:"mccp/cluster-api-providers",id:"mccp/cluster-api-providers",isDocsHomePage:!1,title:"Cluster API Providers",description:"Creating leaf clusters from the MCCP",source:"@site/docs/mccp/cluster-api-providers.md",slug:"/mccp/cluster-api-providers",permalink:"/docs/next/mccp/cluster-api-providers",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/mccp/cluster-api-providers.md",version:"current",sidebar:"mccp",previous:{title:"Existing clusters",permalink:"/docs/next/mccp/existing-clusters"},next:{title:"CAPI Templates",permalink:"/docs/next/mccp/templates"}},s=[{value:"Creating leaf clusters from the MCCP",id:"creating-leaf-clusters-from-the-mccp",children:[]},{value:"Configure and deploy the CAPI providers",id:"configure-and-deploy-the-capi-providers",children:[]},{value:"AWS provider (CAPA)",id:"aws-provider-capa",children:[]},{value:"Docker provider (CAPD)",id:"docker-provider-capd",children:[]}],l={toc:s};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"creating-leaf-clusters-from-the-mccp"},"Creating leaf clusters from the MCCP"),Object(a.b)("p",null,"To enable leaf cluster creation, MCCP leverages the Cluster-API (CAPI) providers for ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api-aws.sigs.k8s.io/getting-started.html"},"AWS")," or ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api.sigs.k8s.io/user/quick-start.html"},"Docker"),".\nIn this section we cover the steps to deploy the providers on a Kubernetes cluster\nthat is running the MCCP."),Object(a.b)("p",null,"CAPI provides declarative APIs, controllers, and tooling to manage the lifecycle of Kubernetes clusters, across\na large number of ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api.sigs.k8s.io/reference/providers.html#infrastructure"},"infrastructure providers"),".\nThe CAPI custom resource definitions are platform independent as each provider implementation handles the creation of VMs,\nVPCs, networks and other required infrastructure parts, enabling consistent and repeatable cluster deployments.\nFor more information on the CAPI project, refer to the ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api.sigs.k8s.io/introduction.html"},"CAPI book"),"."),Object(a.b)("h2",{id:"configure-and-deploy-the-capi-providers"},"Configure and deploy the CAPI providers"),Object(a.b)("p",null,"In all cases, CAPI requires kubectl access to an existing Kubernetes cluster, so in our case we configure ",Object(a.b)("inlineCode",{parentName:"p"},"kubectl")," to use the MCCP cluster."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-bash"},"export KUBECONFIG=/path/to/mccp/kubeconfig\n")),Object(a.b)("h2",{id:"aws-provider-capa"},"AWS provider (CAPA)"),Object(a.b)("p",null,"After having configured ",Object(a.b)("inlineCode",{parentName:"p"},"kubectl"),", to deploy the CAPA components, follow the steps at ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl"},"https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl")),Object(a.b)("h2",{id:"docker-provider-capd"},"Docker provider (CAPD)"),Object(a.b)("p",null,"The Docker infrastructure provider is a reference implementation and is a practical way of testing the MCCP cluster creation\nfeature. It is not intended for production clusters.\nAs CAPD will start docker containers in the host nodes of the MCCP cluster, note that if you are using it with a ",Object(a.b)("inlineCode",{parentName:"p"},"kind"),"\ncluster you'll need to mount the docker socket as described in the ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-andor-configure-a-kubernetes-cluster"},"Install and/or configure a kubernetes cluster")," kind section.\nSimilar to the AWS provider case, configure ",Object(a.b)("inlineCode",{parentName:"p"},"kubectl")," to use the MCCP cluster, and to deploy the CAPD components follow the steps at ",Object(a.b)("a",{parentName:"p",href:"https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl"},"https://cluster-api-aws.sigs.k8s.io/getting-started.html#install-clusterctl"),"."))}p.isMDXComponent=!0},214:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),f=n,m=u["".concat(i,".").concat(f)]||u[f]||d[f]||a;return r?o.a.createElement(m,c(c({ref:t},l),{},{components:r})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);