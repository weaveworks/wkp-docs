(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{170:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return g}));var a=t(0),o=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=o.a.createContext({}),u=function(e){var n=o.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=u(e.components);return o.a.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(t),b=a,g=p["".concat(i,".").concat(b)]||p[b]||d[b]||r;return t?o.a.createElement(g,l(l({ref:n},c),{},{components:t})):o.a.createElement(g,l({ref:n},c))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=b;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=t[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},185:function(e,n,t){"use strict";t.r(n),n.default=t.p+"assets/images/scope-nginx-detail-7be77c629ffc8c57a4bb3456d46c4404.png"},96:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return u}));var a=t(3),o=t(7),r=(t(0),t(170)),i={title:"Running and Managing Workloads"},l={unversionedId:"cluster-operations/user-workloads",id:"version-2.4.2/cluster-operations/user-workloads",isDocsHomePage:!1,title:"Running and Managing Workloads",description:"Running user workloads",source:"@site/versioned_docs/version-2.4.2/cluster-operations/user-workloads.md",slug:"/cluster-operations/user-workloads",permalink:"/wkp-docs/docs/cluster-operations/user-workloads",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/cluster-operations/user-workloads.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Deploying Workloads",permalink:"/wkp-docs/docs/team-workspaces/member-guide"},next:{title:"Adding and Removing Nodes",permalink:"/wkp-docs/docs/cluster-operations/adding-removing-nodes"}},s=[{value:"Running user workloads",id:"running-user-workloads",children:[]},{value:"Managing workloads with GitOps",id:"managing-workloads-with-gitops",children:[]},{value:"Adding a workload",id:"adding-a-workload",children:[]},{value:"Checking a workload is deployed",id:"checking-a-workload-is-deployed",children:[]},{value:"View the new workload in Weave Scope",id:"view-the-new-workload-in-weave-scope",children:[]},{value:"View the UI",id:"view-the-ui",children:[]},{value:"Check logs",id:"check-logs",children:[]},{value:"Updating a workload",id:"updating-a-workload",children:[]},{value:"Debugging",id:"debugging",children:[]},{value:"Verify the <code>flux-sync</code> git tag",id:"verify-the-flux-sync-git-tag",children:[]},{value:"Check the flux logs for errors",id:"check-the-flux-logs-for-errors",children:[]},{value:"Remove a workload",id:"remove-a-workload",children:[]}],c={toc:s};function u(e){var n=e.components,i=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},c,i,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h3",{id:"running-user-workloads"},"Running user workloads"),Object(r.b)("p",null,"Once your cluster is up and running it's time to put it work!"),Object(r.b)("h3",{id:"managing-workloads-with-gitops"},"Managing workloads with GitOps"),Object(r.b)("p",null,"WKP encourages using GitOps to manage your workloads. We can specify the state of the cluster including all our user workloads in the config git repository. The ",Object(r.b)("em",{parentName:"p"},"WKP Flux")," Cluster Component will ensure that the git repository and the cluster then stay in sync. This gives us a number of benefits including"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"An audit trail of who deployed or updated a workload and why"),Object(r.b)("li",{parentName:"ul"},"Deployment rollbacks via ",Object(r.b)("inlineCode",{parentName:"li"},"git revert"))),Object(r.b)("p",null,"Additionally WKP clusters support all the traditional ways of creating and deploying workloads through ",Object(r.b)("inlineCode",{parentName:"p"},"kubectl")," and the api-server directly. Check out the ",Object(r.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/"},"Kubernetes docs")," to familiarize yourself with these tools."),Object(r.b)("h3",{id:"adding-a-workload"},"Adding a workload"),Object(r.b)("p",null,"By default the ",Object(r.b)("inlineCode",{parentName:"p"},"./cluster/manifests")," path within the config repository is reserved for user manifests. Any ",Object(r.b)("inlineCode",{parentName:"p"},".yaml")," Kubernetes manifest you add within this path will be deployed to the cluster automatically."),Object(r.b)("h4",{id:"example-adding-nginx"},"Example: Adding nginx"),Object(r.b)("p",null,"Lets create a new file: ",Object(r.b)("inlineCode",{parentName:"p"},"./cluster/manifests/nginx.yaml")," and set the contents:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  selector:\n    matchLabels:\n      app: nginx\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.14.2\n          ports:\n            - containerPort: 80\n")),Object(r.b)("p",null,"Save the file, then we'll commit and push it to the repository host"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},'git add ./cluster/manifests/nginx.yaml\ngit commit -m "Deploying nginx to the cluster"\ngit push origin master\n')),Object(r.b)("h3",{id:"checking-a-workload-is-deployed"},"Checking a workload is deployed"),Object(r.b)("p",null,"Once we have pushed we can check the workload is deployed in the cluster like with ",Object(r.b)("inlineCode",{parentName:"p"},"kubectl"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"kubectl get pods\n\nNAME                                READY   STATUS    RESTARTS   AGE\nnginx-deployment-574b87c764-mth9r   1/1     Running   0          16s\n")),Object(r.b)("p",null,"There is a new pod running!"),Object(r.b)("h3",{id:"view-the-new-workload-in-weave-scope"},"View the new workload in Weave Scope"),Object(r.b)("p",null,"We can use the Weave Scope Cluster Component to view all the workloads running on the cluster. First open the WKP ui"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"wk ui\n")),Object(r.b)("p",null,'Then when the browser opens click the "Open Scope" button in the Cluster Components list. You can use Scope to explore whats running on your cluster.'),Object(r.b)("p",null,Object(r.b)("img",{alt:"Nginx in Scope",src:t(185).default})),Object(r.b)("h3",{id:"view-the-ui"},"View the UI"),Object(r.b)("p",null,"We can view the Web UI of a pod by forwarding the http ports it listens on"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"kubectl port-forward deployment/nginx-deployment 8080:80\n")),Object(r.b)("p",null,"opening ",Object(r.b)("a",{parentName:"p",href:"http://localhost:8080"},"http://localhost:8080")," in your browser will show the default nginx server response"),Object(r.b)("h3",{id:"check-logs"},"Check logs"),Object(r.b)("p",null,"We can check the logs of our new pod via kubectl"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},'kubectl logs deployment/nginx-deployment\n\n127.0.0.1 - - [05/Jun/2020:10:15:26 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15" "-"\n127.0.0.1 - - [05/Jun/2020:10:15:26 +0000] "GET /favicon.ico HTTP/1.1" 404 169 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15" "-"\n2020/06/05 10:15:26 [error] 6#6: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 127.0.0.1, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "localhost:8080", referrer: "http://localhost:8080/"\n')),Object(r.b)("p",null,"displaying the requests we just made."),Object(r.b)("h3",{id:"updating-a-workload"},"Updating a workload"),Object(r.b)("p",null,"A common operation is upgrading a version of a workload when there is a new release. To do that we can edit the ",Object(r.b)("inlineCode",{parentName:"p"},".yaml")," file and change the docker image to the desired tag:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"vim cluster/manifests/nginx.yaml\ngit diff\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-diff"},"diff --git a/cluster/manifests/nginx.yaml b/cluster/manifests/nginx.yaml\nindex 91f07bf..198b404 100644\n--- a/cluster/manifests/nginx.yaml\n+++ b/cluster/manifests/nginx.yaml\n@@ -14,7 +14,7 @@ spec:\n     spec:\n       containers:\n       - name: nginx\n-        image: nginx:1.14.2\n+        image: nginx:1.16.1\n         ports:\n         - containerPort: 80\n")),Object(r.b)("p",null,"Then once again we can commit and push to update the cluster:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},'git add ./cluster/manifests/nginx.yaml\ngit commit -m "Update nginx to 1.16.1"\ngit push origin master\n')),Object(r.b)("h3",{id:"debugging"},"Debugging"),Object(r.b)("p",null,"If a change to the git repository does not seem to be reflected in the cluster we can take some steps to investigate"),Object(r.b)("h3",{id:"verify-the-flux-sync-git-tag"},"Verify the ",Object(r.b)("inlineCode",{parentName:"h3"},"flux-sync")," git tag"),Object(r.b)("p",null,"When flux applies a commit it will update a git tag on the repository. If you don't have access to the flux pod's logs this is a handy way of checking what was last sync'd:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"$ git pull\nremote: Counting objects: 1, done.\nremote: Total 1 (delta 0), reused 0 (delta 0)\nUnpacking objects: 100% (1/1), 148 bytes | 148.00 KiB/s, done.\nFrom gitlab.dev.wkp.weave.works:foot/simon-gcp-59\n * [new tag]         flux-sync  -> flux-sync\nAlready up to date.\n")),Object(r.b)("p",null,"We can inspect the tag and see when flux last updated it and which commit was last applied."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"git show flux-sync -q\ntag flux-sync\nTagger: Weave Flux <support@weave.works>\nDate:   Fri Jun 5 10:12:29 2020 +0000\n\nSync pointer\n\ncommit d81af6571f525d924e896a5fbcd0706abd09a7ee (HEAD -> master, tag: flux-sync, origin/master)\nAuthor: WKP Support <support@weave.works>\nDate:   Fri Jun 5 12:12:17 2020 +0200\n\n    Deploying nginx to the cluster\n")),Object(r.b)("p",null,"Flux is configured by default to poll and apply the git repository every 10s. If after waiting this long the tag has not updated flux might be having trouble syncing the repository. To learn more we need to check its logs."),Object(r.b)("h3",{id:"check-the-flux-logs-for-errors"},"Check the flux logs for errors"),Object(r.b)("p",null,"We can inspect the flux logs with:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},"kubectl logs -n wkp-flux deployment/flux\n")),Object(r.b)("p",null,"Flux will report any errors raised while it was applying the yaml manifests. This can include things like:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Unable to read the git repository if there are connectivity issues."),Object(r.b)("li",{parentName:"ul"},"Syntax errors in the ",Object(r.b)("inlineCode",{parentName:"li"},".yaml")," manifest files"),Object(r.b)("li",{parentName:"ul"},"Kubernetes validation errors if the manifest files are badly formed.")),Object(r.b)("p",null,"Correct any errors in your yaml files and then try commiting and pushing your changes again."),Object(r.b)("h3",{id:"remove-a-workload"},"Remove a workload"),Object(r.b)("p",null,"Removing a workload is again a simple operation on the config repository:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-console"},'git rm ./cluster/manifests/nginx.yaml\ngit commit -m "Removing nginx for now"\ngit push origin master\n')),Object(r.b)("p",null,"Flux will sync and remove the workload from the cluster."))}u.isMDXComponent=!0}}]);