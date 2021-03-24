(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{125:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return O}));var r=n(0),o=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,O=p["".concat(a,".").concat(d)]||p[d]||b[d]||s;return n?o.a.createElement(O,i(i({ref:t},c),{},{components:n})):o.a.createElement(O,i({ref:t},c))}));function O(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,a=new Array(s);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var c=2;c<s;c++)a[c]=n[c];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},85:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),s=(n(0),n(125)),a={title:"Cluster Node Requirements"},i={unversionedId:"deploying-wkp/hosts",id:"deploying-wkp/hosts",isDocsHomePage:!1,title:"Cluster Node Requirements",description:"The cluster nodes on which Kubernetes is going to be installed when deploying WKP on the wks-ssh track,",source:"@site/docs/deploying-wkp/hosts.md",slug:"/deploying-wkp/hosts",permalink:"/wkp-docs/docs/deploying-wkp/hosts",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/deploying-wkp/hosts.md",version:"current",sidebar:"docs",previous:{title:"Known Issues and Work Arounds",permalink:"/wkp-docs/docs/getting-started/known-issues"},next:{title:"Creating Clusters on SSH Nodes",permalink:"/wkp-docs/docs/deploying-wkp/cluster-creation-on-ssh-nodes"}},l=[{value:"Host OS",id:"host-os",children:[]},{value:"SSH User",id:"ssh-user",children:[]},{value:"Network Ports",id:"network-ports",children:[]}],c={toc:l};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"The cluster nodes on which Kubernetes is going to be installed when deploying WKP on the ",Object(s.b)("inlineCode",{parentName:"p"},"wks-ssh")," track,\nhave a set of requirements."),Object(s.b)("h3",{id:"host-os"},"Host OS"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"wk")," supports the following host OSes:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"CentOS 7.4"),Object(s.b)("li",{parentName:"ul"},"CentOS 7.5"),Object(s.b)("li",{parentName:"ul"},"CentOS 7.6"),Object(s.b)("li",{parentName:"ul"},"RHEL 7.4"),Object(s.b)("li",{parentName:"ul"},"RHEL 7.5"),Object(s.b)("li",{parentName:"ul"},"RHEL 7.6"),Object(s.b)("li",{parentName:"ul"},"Ubuntu 18.04"),Object(s.b)("li",{parentName:"ul"},"Ubuntu 20.04")),Object(s.b)("h3",{id:"ssh-user"},"SSH User"),Object(s.b)("p",null,"In addition, hosts need to have:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"SSH access"),Object(s.b)("li",{parentName:"ul"},"A user able to login with SSH and with password-less sudo permissions")),Object(s.b)("h3",{id:"network-ports"},"Network Ports"),Object(s.b)("p",null,"Finally, ensure that the following ports are open on the hosts:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"6443 (kubernetes api server)"),Object(s.b)("li",{parentName:"ul"},"2379-2380 (etcd)"),Object(s.b)("li",{parentName:"ul"},"6783-6784 (weave net)"),Object(s.b)("li",{parentName:"ul"},"10250 (container logs)"),Object(s.b)("li",{parentName:"ul"},"32000-32767 (node ports)")))}u.isMDXComponent=!0}}]);