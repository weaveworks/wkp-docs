(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{170:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},b=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=u(n),f=r,d=b["".concat(i,".").concat(f)]||b[f]||s[f]||a;return n?o.a.createElement(d,p(p({ref:t},l),{},{components:n})):o.a.createElement(d,p({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),a=(n(0),n(170)),i={title:"Profiling kubectl"},p={unversionedId:"tasks/profiling-kubectl",id:"tasks/profiling-kubectl",isDocsHomePage:!1,title:"Profiling kubectl",description:"To profile kubectl the Go tools needs to be installed. The various kind of go profiles are described in the the pprof package documentation. A longer pprof tutorial can be found on the Go blog.",source:"@site/docs/tasks/profiling-kubectl.md",slug:"/tasks/profiling-kubectl",permalink:"/wkp-docs/docs/next/tasks/profiling-kubectl",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/tasks/profiling-kubectl.md",version:"current",sidebar:"docs",previous:{title:"Patching Node OS packages",permalink:"/wkp-docs/docs/next/tasks/patching-node-os-packages"},next:{title:"Debugging a Problem",permalink:"/wkp-docs/docs/next/troubleshooting/help"}},c=[],l={toc:c};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"To profile ",Object(a.b)("inlineCode",{parentName:"p"},"kubectl")," the ",Object(a.b)("a",{parentName:"p",href:"https://golang.org/doc/install"},"Go tools")," needs to be installed. The various kind of go profiles are described in the ",Object(a.b)("a",{parentName:"p",href:"https://golang.org/pkg/runtime/pprof/#Profile"},"the ",Object(a.b)("inlineCode",{parentName:"a"},"pprof")," package documentation"),". ",Object(a.b)("a",{parentName:"p",href:"https://blog.golang.org/profiling-go-programs"},"A longer ",Object(a.b)("inlineCode",{parentName:"a"},"pprof")," tutorial")," can be found on the Go blog."),Object(a.b)("p",null,"For kubectl, the two most interesting profiles are ",Object(a.b)("inlineCode",{parentName:"p"},"block")," (where do we spend time blocking, eg. waiting for I/O) and ",Object(a.b)("inlineCode",{parentName:"p"},"cpu"),"."),Object(a.b)("p",null,"We distribute a ",Object(a.b)("inlineCode",{parentName:"p"},"kubectl-instrumented")," package that supports two new command line options:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"    --profile='': Name of profile to capture. One of (cpu|heap|goroutine|threadcreate|block|mutex)\n    --profile-output='profile.pprof': Name of the file to write the profile to.\n")),Object(a.b)("p",null,"To generate a profile, use the ",Object(a.b)("inlineCode",{parentName:"p"},"--profile")," option:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"$ kubectl-instrumented get nodes --profile=block\n")),Object(a.b)("p",null,"Generate a visualization of the profile with ",Object(a.b)("inlineCode",{parentName:"p"},"pprof"),". You will need to graphviz installed."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"$ go tool pprof -png ./profile.pprof > profile.png\n")))}u.isMDXComponent=!0}}]);