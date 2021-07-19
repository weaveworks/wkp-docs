(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{123:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return s}));var r=n(3),a=n(7),i=(n(0),n(217)),c={title:"CAPI Provider Identities"},l={unversionedId:"mccp/provider-identities",id:"mccp/provider-identities",isDocsHomePage:!1,title:"CAPI Provider Identities",description:"Multi-tenancy",source:"@site/docs/mccp/provider-identities.md",slug:"/mccp/provider-identities",permalink:"/docs/next/mccp/provider-identities",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/mccp/provider-identities.md",version:"current",sidebar:"mccp",previous:{title:"CAPI Templates",permalink:"/docs/next/mccp/templates"},next:{title:"Templates",permalink:"/docs/next/mccp/cli-templates"}},o=[{value:"Multi-tenancy",id:"multi-tenancy",children:[{value:"Identities and templates",id:"identities-and-templates",children:[]},{value:"<code>identityRef</code>s",id:"identityrefs",children:[]}]}],p={toc:o};function s(e){var t=e.components,c=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,c,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"multi-tenancy"},"Multi-tenancy"),Object(i.b)("p",null,"Some Cluster API providers allow you to choose the account or identity that the new cluster will be created with. This is often referred to as ",Object(i.b)("em",{parentName:"p"},"Multi-tenancy")," in the CAPI world. MCCP currently supports:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://cluster-api-aws.sigs.k8s.io/topics/multitenancy.html"},Object(i.b)("strong",{parentName:"a"},"AWS")," multi-tenancy")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://capz.sigs.k8s.io/topics/multitenancy.html"},Object(i.b)("strong",{parentName:"a"},"Azure")," multi-tenancy")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://github.com/kubernetes-sigs/cluster-api-provider-vsphere/blob/master/docs/identity_management.md"},Object(i.b)("strong",{parentName:"a"},"vSphere")," multi-tenancy"))),Object(i.b)("h3",{id:"identities-and-templates"},"Identities and templates"),Object(i.b)("p",null,"Our ",Object(i.b)("em",{parentName:"p"},"templates")," describe the properties of the cluster, how many nodes, what version of Kubernetes etc, while the ",Object(i.b)("em",{parentName:"p"},"identity")," is which account will be used to create the cluster. So given in our cluster we have the template:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: capi.weave.works/v1alpha1\nkind: CAPITemplate\nmetadata:\n  name: capa-cluster-template\nspec:\n  resourcetemplates:\n    - apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4\n      kind: AWSCluster\n      metadata:\n        name: '${CLUSTER_NAME}'\n      spec:\n        region: '${AWS_REGION}'\n")),Object(i.b)("p",null,"and the identity"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3\nkind: AWSClusterStaticIdentity\nmetadata:\n  name: 'test-account'\nspec:\n  secretRef:\n    name: test-account-creds\n    namespace: capa-system\n  allowedNamespaces:\n    selector:\n      matchLabels:\n        cluster.x-k8s.io/ns: 'testlabel'\n")),Object(i.b)("p",null,"We can select ask the MCCP to use the ",Object(i.b)("inlineCode",{parentName:"p"},"test-account")," when creating the cluster by using the ",Object(i.b)("em",{parentName:"p"},"Infrastructure provider credentials")," dropdown on the ",Object(i.b)("em",{parentName:"p"},"Create new cluster with template")," page:"),Object(i.b)("p",null,Object(i.b)("img",{alt:"Identity Selection",src:n(275).default})),Object(i.b)("p",null,"The resulting definition will have the identity injected into the appropriate place in the template, for this example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4\nkind: AWSCluster\nmetadata:\n  name: example-cluster\nspec:\n  region: eu-north-1\n  identityRef:\n    kind: AWSClusterStaticIdentity\n    name: test-account\n")),Object(i.b)("h3",{id:"identityrefs"},Object(i.b)("inlineCode",{parentName:"h3"},"identityRef"),"s"),Object(i.b)("p",null,"The supported providers implement multi-tenancy by setting an ",Object(i.b)("inlineCode",{parentName:"p"},"identityRef")," on the the provider cluster object, e.g. ",Object(i.b)("inlineCode",{parentName:"p"},"AWSCluster"),", ",Object(i.b)("inlineCode",{parentName:"p"},"AzureCluster")," or ",Object(i.b)("inlineCode",{parentName:"p"},"VSphereCluster"),"."),Object(i.b)("p",null,"The MCCP will search ",Object(i.b)("em",{parentName:"p"},"all namespaces")," in the cluster for potential identities that can be used to create a cluster. The following identity ",Object(i.b)("inlineCode",{parentName:"p"},"kind"),"s are currently supported and their corresponding Cluster kinds:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"AWSClusterStaticIdentity"),": ",Object(i.b)("inlineCode",{parentName:"li"},"AWSCluster")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"AWSClusterRoleIdentity"),": ",Object(i.b)("inlineCode",{parentName:"li"},"AWSCluster")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"AzureClusterIdentity"),": ",Object(i.b)("inlineCode",{parentName:"li"},"AzureCluster")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"VSphereClusterIdentity"),": ",Object(i.b)("inlineCode",{parentName:"li"},"VSphereCluster"))))}s.isMDXComponent=!0},217:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),s=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||b[d]||i;return n?a.a.createElement(m,l(l({ref:t},p),{},{components:n})):a.a.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,c=new Array(i);c[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var p=2;p<i;p++)c[p]=n[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},275:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/identity-selection-f7ade1f26e327412eb49a32b71403f1e.png"}}]);