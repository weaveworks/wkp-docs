(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{211:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var i=n(0),r=n.n(i);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),s=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,a=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),p=s(n),d=i,m=p["".concat(a,".").concat(d)]||p[d]||u[d]||o;return n?r.a.createElement(m,l(l({ref:t},b),{},{components:n})):r.a.createElement(m,l({ref:t},b))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var b=2;b<o;b++)a[b]=n[b];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},73:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return s}));var i=n(3),r=n(7),o=(n(0),n(211)),a={title:"Managing the Git Configuration Repository"},l={unversionedId:"getting-started/git-config-repository",id:"getting-started/git-config-repository",isDocsHomePage:!1,title:"Managing the Git Configuration Repository",description:"The Git Config Repository is where the cluster configuration is stored. It contains the cluster definition and your application manifests.",source:"@site/docs/getting-started/git-config-repository.md",slug:"/getting-started/git-config-repository",permalink:"/docs/next/getting-started/git-config-repository",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/docs/getting-started/git-config-repository.md",version:"current",sidebar:"docs",previous:{title:"Configuring Entitlements",permalink:"/docs/next/getting-started/entitlements"},next:{title:"Known Issues and Work Arounds",permalink:"/docs/next/getting-started/known-issues"}},c=[{value:"Initial configuration during <code>wk setup</code>",id:"initial-configuration-during-wk-setup",children:[{value:"GitHub",id:"github",children:[]},{value:"GitLab",id:"gitlab",children:[]}]},{value:"SSH configuration",id:"ssh-configuration",children:[{value:"Customizing <code>known_hosts</code>",id:"customizing-known_hosts",children:[]}]}],b={toc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(i.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The ",Object(o.b)("em",{parentName:"p"},"Git Config Repository")," is where the cluster configuration is stored. It contains the cluster definition and your application manifests."),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"https://github.com/fluxcd/flux"},"Flux")," is used to sync the Git Config Repository and the cluster so its important to have it configured correctly. WKP supports GitHub and GitLab (Cloud or self-hosted)."),Object(o.b)("h2",{id:"initial-configuration-during-wk-setup"},"Initial configuration during ",Object(o.b)("inlineCode",{parentName:"h2"},"wk setup")),Object(o.b)("p",null,"In order to create a cluster, we first need to define and configure its properties. To do that, we run ",Object(o.b)("inlineCode",{parentName:"p"},"wk setup install")," which generates a set of files in the current directory, that will be used for the configuration of our new cluster. The directory also includes a new local git repository that tracks the newly generated files."),Object(o.b)("p",null,"The generated files include:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/bin"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"eksctl"),": used when creating an EKS cluster"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"footloose"),": used when creating a Footloose cluster"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"hub"),": used to interact with GitHub"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"ignite"),": used to run a Footloose cluster with an ignite backend"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"jk"),": used to generate configuration"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"kubeseal"),": used to interact with sealed secrets "))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/cluster"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/manifests"),": manifests for user-defined workloads that need to run on the cluster will live here"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/platform"),": additional WKP runtime configuration files"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/doc"),": creation guides"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"/setup"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"config.yaml"),": main configuration file used when creating a cluster")))),Object(o.b)("p",null,"After running ",Object(o.b)("inlineCode",{parentName:"p"},"wk setup install")," we configure WKP by editing ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml"),". WKP needs to know a little bit about how and where you're hosting your git repository. The main parameter in ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml")," is the ",Object(o.b)("inlineCode",{parentName:"p"},"gitProvider")," and can be set either to ",Object(o.b)("inlineCode",{parentName:"p"},"github")," or ",Object(o.b)("inlineCode",{parentName:"p"},"gitlab"),"."),Object(o.b)("p",null,"A detailed documentation for ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml")," can be found in ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml")," file itself."),Object(o.b)("h3",{id:"github"},"GitHub"),Object(o.b)("p",null,"When hosting your config repository on GitHub:."),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"In ",Object(o.b)("em",{parentName:"li"},"config.yaml")," set ",Object(o.b)("inlineCode",{parentName:"li"},"gitProvider")," to ",Object(o.b)("inlineCode",{parentName:"li"},"github")),Object(o.b)("li",{parentName:"ol"},"In ",Object(o.b)("em",{parentName:"li"},"config.yaml")," set ",Object(o.b)("inlineCode",{parentName:"li"},"gitProviderOrg")," to the Github organization or user WKP should create the repository under."),Object(o.b)("li",{parentName:"ol"},"Continue following the instructions in one of the ",Object(o.b)("em",{parentName:"li"},"Cluster Creation")," guides.")),Object(o.b)("h3",{id:"gitlab"},"GitLab"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("em",{parentName:"p"},"Note:")," For this document, replace:"),Object(o.b)("ul",{parentName:"blockquote"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"gitlab.example.com")," with your company's gitlab host address"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"my-example-repo")," with your desired repo name"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"my-user")," with your GitLab username or groupname"))),Object(o.b)("p",null,"When hosting the repository on GitLab:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"In ",Object(o.b)("em",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"em"},"config.yaml"))," set ",Object(o.b)("inlineCode",{parentName:"li"},"gitProvider")," to ",Object(o.b)("inlineCode",{parentName:"li"},"gitlab")),Object(o.b)("li",{parentName:"ol"},"visit gitlab.example.com/projects/new and create a new repo, ",Object(o.b)("inlineCode",{parentName:"li"},"my-example-repo"),Object(o.b)("em",{parentName:"li"},"Note:")," WKP does not support repo creation on Gitlab currently, so this is a required step."),Object(o.b)("li",{parentName:"ol"},"In ",Object(o.b)("em",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"em"},"config.yaml"))," set ",Object(o.b)("inlineCode",{parentName:"li"},"gitUrl")," to your newly created repository. e.g. ",Object(o.b)("inlineCode",{parentName:"li"},"git@gitlab.example.com:my-user/my-example-repo")),Object(o.b)("li",{parentName:"ol"},"Continue following the instructions in one of the ",Object(o.b)("em",{parentName:"li"},"Cluster Creation")," guides until you are prompted to run ",Object(o.b)("inlineCode",{parentName:"li"},"wk setup run"),". When you run ",Object(o.b)("inlineCode",{parentName:"li"},"wk setup run")," a deploy key that gives the cluster read/write access to the git repository will be generated. This deploy key needs to be installed in the GitLab UI:"),Object(o.b)("li",{parentName:"ol"},"visit gitlab.example.com/my-user/my-example-repo/settings/repository:",Object(o.b)("ol",{parentName:"li"},Object(o.b)("li",{parentName:"ol"},"navigate to the ",Object(o.b)("inlineCode",{parentName:"li"},"Deploy Keys")," section, and ",Object(o.b)("inlineCode",{parentName:"li"},"Expand")," the section"),Object(o.b)("li",{parentName:"ol"},"create a ",Object(o.b)("inlineCode",{parentName:"li"},"Title"),", it can be anything"),Object(o.b)("li",{parentName:"ol"},"Paste the deploy key provided in the command line output into the ",Object(o.b)("inlineCode",{parentName:"li"},"Key")," section."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"[","IMPORTANT","]")," ensure ",Object(o.b)("inlineCode",{parentName:"li"},"Write access allowed")," is checked"),Object(o.b)("li",{parentName:"ol"},"click ",Object(o.b)("inlineCode",{parentName:"li"},"Add key")))),Object(o.b)("li",{parentName:"ol"},"Re-run ",Object(o.b)("inlineCode",{parentName:"li"},"wk setup run")," again and continue the ",Object(o.b)("em",{parentName:"li"},"Cluster Creation")," instructions.")),Object(o.b)("h2",{id:"ssh-configuration"},"SSH configuration"),Object(o.b)("p",null,"WKP requires using ",Object(o.b)("strong",{parentName:"p"},"SSH")," to sync the git config repo and the cluster. To provide additional security WKP enables ",Object(o.b)("inlineCode",{parentName:"p"},"StrictHostKeyChecking")," and checks that the server providing the git config repo matches a public key that we have stored. For popular git providers like GitHub we include the public key with WKP and no further configuration is needed. For self hosted repositories like Gitlab we need to retrieve and store the server's public key. We save it in a file called ",Object(o.b)("inlineCode",{parentName:"p"},"known_hosts"),"."),Object(o.b)("h3",{id:"customizing-known_hosts"},"Customizing ",Object(o.b)("inlineCode",{parentName:"h3"},"known_hosts")),Object(o.b)("p",null,"During ",Object(o.b)("inlineCode",{parentName:"p"},"wk setup run")," your ",Object(o.b)("inlineCode",{parentName:"p"},"gitProvider")," and ",Object(o.b)("inlineCode",{parentName:"p"},"gitUrl")," are checked. If we determine a custom domain is being used we will automatically connect to the server, retrieve the public keys and save them to ",Object(o.b)("inlineCode",{parentName:"p"},"cluster/platform/ssh_config/known_hosts"),". This ",Object(o.b)("inlineCode",{parentName:"p"},"known_hosts")," file will then be loaded into the ",Object(o.b)("inlineCode",{parentName:"p"},"flux")," and ",Object(o.b)("inlineCode",{parentName:"p"},"gitops-repo-broker")," and any other pod that needs to talk to the git config repo."),Object(o.b)("p",null,"If you change the keys on your ssh server you may need to regenerate ",Object(o.b)("inlineCode",{parentName:"p"},"known_hosts"),"."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"ssh-keyscan gitlab.example.com > cluster/platform/ssh_config/known_hosts\n")),Object(o.b)("p",null,"Test that the new ",Object(o.b)("inlineCode",{parentName:"p"},"known_hosts")," file works"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"ssh -oBatchMode=yes -o UserKnownHostsFile=cluster/platform/ssh_config/known_hosts -T git@gitlab.example.com\n")),Object(o.b)("p",null,"Commit and push to update the cluster"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'git commit -m "Updated known_hosts"\ngit push origin master\n')))}s.isMDXComponent=!0}}]);