(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var a=n(3),r=(n(0),n(125));const o={title:"Connecting Clusters"},i={unversionedId:"mccp/usage-guide",id:"mccp/usage-guide",isDocsHomePage:!1,title:"Connecting Clusters",description:"To connect a cluster to the multi-cluster control plane (MCCP), first navigate to the Clusters section of the WKP UI and click on the Connect a cluster button. You will then be presented with a form to add the details of the leaf cluster being connected.",source:"@site/docs/mccp/usage-guide.md",slug:"/mccp/usage-guide",permalink:"/wkp-docs/docs/mccp/usage-guide",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/mccp/usage-guide.md",version:"current",sidebar:"docs",previous:{title:"Configuring a Database",permalink:"/wkp-docs/docs/mccp/database-configuration"},next:{title:"Implementing Team Workspaces",permalink:"/wkp-docs/docs/team-workspaces/usage-guide"}},c=[{value:"How to: Update a cluster",id:"how-to-update-a-cluster",children:[]}],s={toc:c};function l({components:e,...t}){return Object(r.b)("wrapper",Object(a.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"To connect a cluster to the multi-cluster control plane (MCCP), first navigate to the ",Object(r.b)("inlineCode",{parentName:"p"},"Clusters")," section of the WKP UI and click on the ",Object(r.b)("inlineCode",{parentName:"p"},"Connect a cluster")," button. You will then be presented with a form to add the details of the leaf cluster being connected. "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Name: this is the name of the leaf cluster. This is a required field."),Object(r.b)("li",{parentName:"ul"},"Ingress URL: this is the publicly accessible HTTP(S) endpoint of the leaf cluster. This is an optional field.")),Object(r.b)("p",null,"Click on the ",Object(r.b)("inlineCode",{parentName:"p"},"Save & next")," button to persist these details. You will then be presented with a ",Object(r.b)("inlineCode",{parentName:"p"},"kubectl")," command that you can run to install an agent on your leaf cluster. The agent is responsible for inspecting the leaf cluster and sending back leaf information to the MCCP server. It will not make any changes to your cluster. "),Object(r.b)("p",null,"Ensure that your current kubeconfig context is setup to use the leaf cluster. Then copy the command and run it. "),Object(r.b)("p",null,"After a few seconds, the status of your cluster should change to ",Object(r.b)("inlineCode",{parentName:"p"},"Connected (Ready)")," which indicates that the leaf cluster has been successfully connected."),Object(r.b)("div",{className:"admonition admonition-info alert alert--info"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("blockquote",{parentName:"div"},Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Note:")," You may need to add an additional ingress rule for ",Object(r.b)("inlineCode",{parentName:"p"},"/gitops/api/agent.yaml")," to ensure that this path does not require authentication. The manifest below shows how to add this rule.")))),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"---\napiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    cert-manager.io/cluster-issuer: letsencrypt-prod\n  name: wkp-ui-agent-no-auth\n  namespace: wkp-ui\nspec:\n  rules:\n  - host: <hostname-to-use> # e.g. app.wkp.weave.works\n    http:\n      paths:\n      - path: /gitops/api/agent.yaml\n        backend:\n          serviceName: wkp-ui-nginx-ingress-controller\n          servicePort: 80\n  tls:\n  - hosts:\n    - <hostname-to-use> # e.g. app.wkp.weave.works\n    secretName: wkp-tls\n")),Object(r.b)("h2",{id:"how-to-update-a-cluster"},"How to: Update a cluster"),Object(r.b)("p",null,"To update a cluster, click on the rightmost icon of that cluster's row. You will be presented with a form that allows you to update its name and ingress URL. Finally click on the ",Object(r.b)("inlineCode",{parentName:"p"},"Save & next")," button to persist these changes."))}l.isMDXComponent=!0},125:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),b=a,m=p["".concat(i,".").concat(b)]||p[b]||d[b]||o;return n?r.a.createElement(m,c(c({ref:t},l),{},{components:n})):r.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);