(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{125:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var r=n(0),o=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=o.a.createContext({}),p=function(e){var t=o.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return o.a.createElement(i.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,l=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,h=u["".concat(l,".").concat(d)]||u[d]||b[d]||c;return n?o.a.createElement(h,a(a({ref:t},i),{},{components:n})):o.a.createElement(h,a({ref:t},i))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,l=new Array(c);l[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:r,l[1]=a;for(var i=2;i<c;i++)l[i]=n[i];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},90:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),c=(n(0),n(125)),l={title:"Troubleshooting wks-controller"},a={unversionedId:"troubleshooting/controller",id:"troubleshooting/controller",isDocsHomePage:!1,title:"Troubleshooting wks-controller",description:"wks-controller is responsible for the upgrade process and if it's not running not a lot will happen.",source:"@site/docs/troubleshooting/controller.md",slug:"/troubleshooting/controller",permalink:"/wkp-docs/docs/troubleshooting/controller",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/troubleshooting/controller.md",version:"current",sidebar:"docs",previous:{title:"Troubleshooting kubelet",permalink:"/wkp-docs/docs/troubleshooting/kubelet"},next:{title:"WKP Scope",permalink:"/wkp-docs/docs/troubleshooting/scope"}},s=[{value:"Check that <code>wks-controller</code> is running correctly",id:"check-that-wks-controller-is-running-correctly",children:[]},{value:"Check <code>wks-controller</code> logs",id:"check-wks-controller-logs",children:[]},{value:"Restart the <code>wks-controller</code> pod",id:"restart-the-wks-controller-pod",children:[]}],i={toc:s};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"wks-controller")," is responsible for the upgrade process and if it's not running not a lot will happen."),Object(c.b)("h3",{id:"check-that-wks-controller-is-running-correctly"},"Check that ",Object(c.b)("inlineCode",{parentName:"h3"},"wks-controller")," is running correctly"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-console"},"$ kubectl get pods --namespace weavek8sops\nNAME                              READY   STATUS    RESTARTS   AGE\ncapi-controller-7b8c44f84c-f48h6  1/1     Running   0          3d6h\nwks-controller-6c98fd95d8-d5bqw   1/1     Running   0          3d6h\n")),Object(c.b)("p",null,"If it is not running some things to check:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"Flux might have a configuration error and fail to sync all yaml manifests from the git repo."),Object(c.b)("li",{parentName:"ul"},"The cluster is having trouble scheduling pods.")),Object(c.b)("h3",{id:"check-wks-controller-logs"},"Check ",Object(c.b)("inlineCode",{parentName:"h3"},"wks-controller")," logs"),Object(c.b)("p",null,"Check the logs for errors that might suggest a path towards resolving the upgrade."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"kubectl logs --namespace weavek8sops deployment/wks-controller\n")),Object(c.b)("h3",{id:"restart-the-wks-controller-pod"},"Restart the ",Object(c.b)("inlineCode",{parentName:"h3"},"wks-controller")," pod"),Object(c.b)("p",null,"Restarting the pod may get things moving if something strange has happened."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"kubectl delete pod --namespace weavek8sops wks-controller-6c98fd95d8-d5bqw\n")),Object(c.b)("p",null,"Wait and see if the node status changes, then check the logs again."))}p.isMDXComponent=!0}}]);