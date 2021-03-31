(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{143:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),o=(n(0),n(170)),i={title:"The wk command"},c={unversionedId:"getting-started/wk",id:"version-2.4.2/getting-started/wk",isDocsHomePage:!1,title:"The wk command",description:"Clusters are installed, upgraded and scaled with the wk command. It can be installed through either an RPM repository or downloaded.",source:"@site/versioned_docs/version-2.4.2/getting-started/wk.md",slug:"/getting-started/wk",permalink:"/wkp/docs/getting-started/wk",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/getting-started/wk.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Introduction to wk",permalink:"/wkp/docs/"},next:{title:"Configuring Entitlements",permalink:"/wkp/docs/getting-started/entitlements"}},s=[{value:"Static binary",id:"static-binary",children:[]}],d={toc:s};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Clusters are installed, upgraded and scaled with the ",Object(o.b)("inlineCode",{parentName:"p"},"wk")," command. It can be installed through either an RPM repository or downloaded."),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},Object(o.b)("strong",{parentName:"p"},"See also: ",Object(o.b)("inlineCode",{parentName:"strong"},"wksctl")," documentation"),"\n",Object(o.b)("inlineCode",{parentName:"p"},"wk")," inherits much of its functionality from ",Object(o.b)("inlineCode",{parentName:"p"},"wksctl"),". Check out ",Object(o.b)("a",{parentName:"p",href:"https://wksctl.readthedocs.io/"},"the wksctl docs")," for more details about the base commands."))),Object(o.b)("h3",{id:"static-binary"},"Static binary"),Object(o.b)("p",null,"To download ",Object(o.b)("inlineCode",{parentName:"p"},"wk")," and make it executable, run:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-shell"},"curl -o wk https://weaveworks-wkp.s3.amazonaws.com/wk-$version-$os-amd64\nchmod +x wk\nmv wk /usr/local/bin/\n")),Object(o.b)("p",null,"Where ",Object(o.b)("inlineCode",{parentName:"p"},"version")," is the desired version, e.g. ",Object(o.b)("inlineCode",{parentName:"p"},"2.0.3")," and ",Object(o.b)("inlineCode",{parentName:"p"},"os")," is ",Object(o.b)("inlineCode",{parentName:"p"},"linux")," or ",Object(o.b)("inlineCode",{parentName:"p"},"darwin"),". Only ",Object(o.b)("inlineCode",{parentName:"p"},"amd64")," architectures are supported at this time."))}l.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return u}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=a.a.createContext({}),l=function(e){var t=a.a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(d.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=r,u=p["".concat(i,".").concat(m)]||p[m]||b[m]||o;return n?a.a.createElement(u,c(c({ref:t},d),{},{components:n})):a.a.createElement(u,c({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var d=2;d<o;d++)i[d]=n[d];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);