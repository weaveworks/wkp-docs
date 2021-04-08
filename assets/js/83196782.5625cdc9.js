(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{124:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return s})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return l}));var n=a(3),r=a(7),o=(a(0),a(170)),i={title:"Implementing Team Workspaces"},s={unversionedId:"team-workspaces/usage-guide",id:"version-2.4.2/team-workspaces/usage-guide",isDocsHomePage:!1,title:"Implementing Team Workspaces",description:"What are Team Workspaces?",source:"@site/versioned_docs/version-2.4.2/team-workspaces/usage-guide.md",slug:"/team-workspaces/usage-guide",permalink:"/docs/team-workspaces/usage-guide",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.4.2/team-workspaces/usage-guide.md",version:"2.4.2",sidebar:"version-2.4.2/docs",previous:{title:"Installing WKP on Footloose",permalink:"/docs/deploying-wkp/cluster-creation-on-footloose"},next:{title:"Specifying Team Permissions",permalink:"/docs/team-workspaces/team-permissions"}},c=[{value:"What are Team Workspaces?",id:"what-are-team-workspaces",children:[]},{value:"How to: Enable the team workspaces feature",id:"how-to-enable-the-team-workspaces-feature",children:[]},{value:"How To: Create and use a team workspace",id:"how-to-create-and-use-a-team-workspace",children:[{value:"Using a GitHub token",id:"using-a-github-token",children:[]},{value:"Using a GitLab token",id:"using-a-gitlab-token",children:[]},{value:"Adding a token manually",id:"adding-a-token-manually",children:[]},{value:"Creating a Workspace",id:"creating-a-workspace",children:[]}]},{value:"Workspace CRD fields",id:"workspace-crd-fields",children:[]},{value:"Cluster access for workspace teams",id:"cluster-access-for-workspace-teams",children:[]},{value:"Updating a workspace",id:"updating-a-workspace",children:[]}],p={toc:c};function l(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"what-are-team-workspaces"},"What are Team Workspaces?"),Object(o.b)("p",null,"A workspace is a GitOps repository tied to one or more namespaces in a WKP cluster and a set of Kubernetes controllers that are keeping them in sync. All Kubernetes objects created in the workspace repository are applied to the specified namespace(s) by the controllers. One can create a workspace by adding a Workspace custom resource manifest in the cluster repository."),Object(o.b)("h2",{id:"how-to-enable-the-team-workspaces-feature"},"How to: Enable the team workspaces feature"),Object(o.b)("p",null,"To enable the team workspaces feature edit the ",Object(o.b)("inlineCode",{parentName:"p"},"setup/config.yaml")," file, set the ",Object(o.b)("inlineCode",{parentName:"p"},"enabledFeatures: teamWorkspaces"),"\nfield to ",Object(o.b)("inlineCode",{parentName:"p"},"true"),", commit and push to the cluster repository."),Object(o.b)("p",null,"After a few seconds, the team workspaces components are deployed in the ",Object(o.b)("inlineCode",{parentName:"p"},"wkp-workspaces")," namespace."),Object(o.b)("h2",{id:"how-to-create-and-use-a-team-workspace"},"How To: Create and use a team workspace"),Object(o.b)("p",null,"The team workspaces feature supports the creation of repositories in either GitHub or GitLab. It also supports self-hosted instances of the above."),Object(o.b)("p",null,"New team workspace repositories will be created in an organization. A personal access token is therefore needed for the succesful creation of the workspace repository and the setup of its deploy keys."),Object(o.b)("h3",{id:"using-a-github-token"},"Using a GitHub token"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Choose a user that is a member of your organization. Using the GitHub UI, create a personal access token for this user that has ",Object(o.b)("inlineCode",{parentName:"p"},"repo")," and ",Object(o.b)("inlineCode",{parentName:"p"},"admin:org")," permissions and store it in an environment variable i.e."),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"export GITHUB_TOKEN=...\n"))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Run the following command to generate a sealed secret manifest for the token:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"wk workspaces add-provider --type github --token $GITHUB_TOKEN --secret-name github-token\n")),Object(o.b)("p",{parentName:"li"},"The ",Object(o.b)("inlineCode",{parentName:"p"},"--secret-name")," parameter indicates the name of the secret that will be created in the cluster. The name of the secret needs to be unique as there can be more than one git providers used at any given point."),Object(o.b)("p",{parentName:"li"},"For self-hosted instances, you need to also specify the ",Object(o.b)("inlineCode",{parentName:"p"},"--hostname")," parameter:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"wk workspaces add-provider --type github --token $GITHUB_TOKEN --secret-name github-token --hostname github.wkp.weave.works\n")),Object(o.b)("p",{parentName:"li"},"If this parameter is not specified, the ",Object(o.b)("inlineCode",{parentName:"p"},"--hostname")," parameter will default to ",Object(o.b)("inlineCode",{parentName:"p"},"github.com"),"\nAfter running this command, a new manifest containing a sealed secret for the git provider token should be generated in the ",Object(o.b)("inlineCode",{parentName:"p"},"./cluster/platform/workspaces")," directory.")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Push the sealed secret to the config repository, so that flux can apply it:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},'git add ./cluster/platform/workspaces/git-provider-github-token.yaml\ngit commit -m "Add git provider token"\ngit push origin master\n')),Object(o.b)("p",{parentName:"li"},"This step can be skipped if the ",Object(o.b)("inlineCode",{parentName:"p"},"--git-commit-push")," parameter is present in the previous step."))),Object(o.b)("h3",{id:"using-a-gitlab-token"},"Using a GitLab token"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Choose a user that is a member of your organization. Using the GitLab UI, create a personal access token for this user that has the ",Object(o.b)("inlineCode",{parentName:"p"},"api")," permission and store it in an environment variable i.e."),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"export GITLAB_TOKEN=...\n"))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Run the following command to generate a sealed secret manifest for the token:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"wk workspaces add-provider --type gitlab --token $GITLAB_TOKEN --secret-name gitlab-token\n")),Object(o.b)("p",{parentName:"li"},"The ",Object(o.b)("inlineCode",{parentName:"p"},"--secret-name")," parameter indicates the name of the secret that will be created in the cluster. The name of the secret needs to be unique as there can be more than one git providers used at any given point."),Object(o.b)("p",{parentName:"li"},"For self-hosted instances, you need to also specify the ",Object(o.b)("inlineCode",{parentName:"p"},"--hostname")," parameter:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},"wk workspaces add-provider --type gitlab --token $GITLAB_TOKEN --secret-name gitlab-token --hostname gitlab.wkp.weave.works\n")),Object(o.b)("p",{parentName:"li"},"If this parameter is not specified, the ",Object(o.b)("inlineCode",{parentName:"p"},"--hostname")," parameter will default to ",Object(o.b)("inlineCode",{parentName:"p"},"gitlab.com"),"\nAfter running this command, a new manifest containing a sealed secret for the git provider token should be generated in the ",Object(o.b)("inlineCode",{parentName:"p"},"./cluster/platform/workspaces")," directory.")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Push the sealed secret to the config repository, so that flux can apply it:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-bash"},'git add ./cluster/platform/workspaces/git-provider-gitlab-token.yaml\ngit commit -m "Add git provider token"\ngit push origin master\n')),Object(o.b)("p",{parentName:"li"},"This step can be skipped if the ",Object(o.b)("inlineCode",{parentName:"p"},"--git-commit-push")," parameter is present in the previous step."))),Object(o.b)("h3",{id:"adding-a-token-manually"},"Adding a token manually"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"wk workspaces add-provider")," command is a convenient way to add a provider token to the cluster. It is also possible to add a token manually which can be useful in cases where a solution like ",Object(o.b)("a",{parentName:"p",href:"https://github.com/mozilla/sops"},"SOPS")," or ",Object(o.b)("a",{parentName:"p",href:"https://www.vaultproject.io/"},"Vault")," is used to store secrets."),Object(o.b)("p",null,"For example, the following command will generate a sealed secret manifest for the token:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"kubectl create secret -n wkp-workspaces generic github-token --from-literal=token=$GITHUB_TOKEN --dry-run -o yaml | kubeseal -o yaml > ./cluster/platform/workspaces/git-provider-github-token.yaml\n")),Object(o.b)("p",null,"However, the generated secret will need some additional metadata in order for it to be used by other parts of the WKP platform. In those cases where a git provider token needs to be created manually, please ensure the following label and annotations are in place for the secret:"),Object(o.b)("p",null,"Label:"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/type: git-provider-token")),Object(o.b)("p",null,"Annotations:"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-type: github")," or ",Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-type: gitlab")," depending on the git provider used."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-hostname: github.com")," or ",Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-hostname: gitlab.com")," depending on the git provider used."),Object(o.b)("p",null,"If a self-hosted instance is used then the ",Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-hostname")," annotation needs to point to the hostname of that instance i.e. ",Object(o.b)("inlineCode",{parentName:"p"},"wkp.weave.works/git-provider-hostname: git.wkp.weave.works")),Object(o.b)("p",null,"You can use ",Object(o.b)("inlineCode",{parentName:"p"},"kubectl")," to create the above after the secret has been created:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"kubectl label secrets github-token wkp.weave.works/type=git-provider-token\nkubectl annotate secrets github-token wkp.weave.works/git-provider-type=github\nkubectl annotate secrets github-token wkp.weave.works/git-provider-hostname=git.wkp.weave.works\n")),Object(o.b)("h3",{id:"creating-a-workspace"},"Creating a Workspace"),Object(o.b)("p",null,"Once the secret is deployed to the cluster, you can start creating team workspaces:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Create a Workspace manifest:"),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: wkp.weave.works/v1beta1\nkind: Workspace\nmetadata:\n  name: demo\n  namespace: wkp-workspaces\nspec:\n  interval: 1m\n  suspend: false\n  gitProvider:\n    type: github\n    hostname: github.com\n    tokenRef:\n      name: github-token # the git provider token created previously\n  gitRepository:\n    name: team-victor # <- specify repository name\n    owner: wkp-example-org # <- replace org with your GitHub organization\n    branch: main # <- specify which repository branch should contain workloads (optional)\n    path: "./" # <- specify which directory within the repository should contain workloads (optional)\n    teams:\n      - team-victor # <- specify which teams should be given access to the repository (optional)\n  clusterScope:\n    role: namespace-admin\n    namespaces:\n      - name: demo-app # <- target namespace\n        resourceQuota: # <- optional field, defines a resource quota for namespace\n          hard:\n            requests.cpu: "1"\n            requests.memory: 1Gi\n            limits.cpu: "2"\n            limits.memory: 2Gi\n      - name: demo-db # <- another target namespace\n        limitRange:   # <- optional field, defines a limit range for namespace\n          limits:\n          - type: Container\n            max:\n              memory: 1Gi\n            min:\n              memory: 500Mi\n    networkPolicy: workspace-isolation # <- optional field, sets a predefined network policy in the target namespaces\n'))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Commit the manifest to the ",Object(o.b)("inlineCode",{parentName:"p"},"cluster/manifests")," directory in the config repository.")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Wait until the ",Object(o.b)("inlineCode",{parentName:"p"},"wkp-workspaces-controller")," creates the namespace(s). This shouldn't take longer than the sync interval specified in the manifest plus a few seconds."),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"Note: for troubleshooting, check the ",Object(o.b)("inlineCode",{parentName:"em"},"wkp-workspaces-controller")," logs (for applying failures) and ",Object(o.b)("inlineCode",{parentName:"em"},"source-controller")," logs (for GitHub API errors)")))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("p",{parentName:"li"},"Commit something to the newly created workspace repository (accessible by the workspace link in the UI). The controllers will reconcile your changes with the workspace namespace(s)."))),Object(o.b)("h2",{id:"workspace-crd-fields"},"Workspace CRD fields"),Object(o.b)("p",null,"The Workspace manifest defines three sections in its spec:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"gitProvider"),": The git provider which should host the git repository of the workspace and an\naccess token for operating on the repo. Both GitHub and GitLab are supported."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"gitRepository"),': The repository details, which teams should get access to the workspace.\nThe team needs to exist in the provider. The branch and path, if specified, restrict the locations that will be examined for workloads that need to be deployed. Only manifests checked in on the specified branch within the specified repository directory will be processed; "branch" defaults to "main" and "path" defaults to "./".'),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"clusterScope"),":",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"the list of namespaces that are in the workspace.\nFor each of the namespaces, additional options may be defined:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"resourceQuota"),": used to define constraints that limit aggregate resource consumption\nin the namespace"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"limitRange"),": used to define a policy to constrain resource allocations for pods or containers\nrunning in the namespace"))),Object(o.b)("li",{parentName:"ul"},"the role of the members of the workspace with possible options:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"workspace-member"),": members get limited permissions on the target namespaces"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"namespace-admin"),": members get admin permissions on the target namespaces"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"cluster-admin"),": members get cluster admin permissions"))),Object(o.b)("li",{parentName:"ul"},"a network policy for the namespaces with possible option:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"workspace-isolation"),": services created in the target namespaces cannot be accessed\nfrom namespaces outside of the workspace, and vice versa services running in namespaces\noutside of the workspace, cannot be accessed from within the namespace. If this field is not\nincluded in the manifest no network policy will be applied.")))))),Object(o.b)("h2",{id:"cluster-access-for-workspace-teams"},"Cluster access for workspace teams"),Object(o.b)("p",null,"After creating a workspace the teams specified in the ",Object(o.b)("inlineCode",{parentName:"p"},"gitRepository")," section will have access to the repository. These teams can manage the workspace by adding and removing manifests, committing and pushing."),Object(o.b)("p",null,"It is also very useful for these teams to have ",Object(o.b)("inlineCode",{parentName:"p"},"kubectl")," access to the workspace to view logs and deployment statuses. Limited access to only those namespaces managed by the workspace is provided by a service account automatically generated during the creation process. To generate a kubeconfig file that uses this service account run:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"wk workspaces kubeconfig --workspace-name demo\n")),Object(o.b)("p",null,"This will write the config to standard output and can be manually forwarded to the workspace teams. The teams can then save it to a file ",Object(o.b)("inlineCode",{parentName:"p"},"demo-workspace-kubeconfig")," use it like so:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"kubectl --kubeconfig=demo-workspace-kubeconfig get pods\n")),Object(o.b)("p",null,"The kubeconfig file sets the default namespace to the first namespace listed in the Workspace definition. In this case the above command will show the pods in ",Object(o.b)("inlineCode",{parentName:"p"},"demo-app"),". To interact with other workspace namespaces (like ",Object(o.b)("inlineCode",{parentName:"p"},"demo-db")," in this case), the usual kubectl namespace flag can be provided: ",Object(o.b)("inlineCode",{parentName:"p"},"kubectl --kubeconfig=demo-workspace-kubeconfig --namespace=demo-db get pods")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"If the cluster goes through a Kubernetes version upgrade, kubeconfig files will need to be regenerated.")),Object(o.b)("h2",{id:"updating-a-workspace"},"Updating a workspace"),Object(o.b)("p",null,"After a workspace has been created, it is possible to change multiple of its fields.\nThe modifiable fields of the workspace CRD consist of:"),Object(o.b)("p",null,"in the ",Object(o.b)("inlineCode",{parentName:"p"},"spec")," map:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"the ",Object(o.b)("inlineCode",{parentName:"li"},"interval")," of the reconciliation"),Object(o.b)("li",{parentName:"ul"},"the ",Object(o.b)("inlineCode",{parentName:"li"},"suspend")," field, toggling the reconciliation on or off")),Object(o.b)("p",null,"in the ",Object(o.b)("inlineCode",{parentName:"p"},"clusterScope")," map:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"namespaces")," can be removed or added to the workspace. A namespace can only be in one workspace.\nIf the namespace doesn't exist it will be created. When a namespace is removed from a workspace,\nthe members of the workspace will not be able to access it anymore, and deployments will not be\nreconciled from the workspace repository.\nWorkload running in a removed namespace are not terminated.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"resource quotas")," and ",Object(o.b)("inlineCode",{parentName:"p"},"limit ranges")))))}l.isMDXComponent=!0},170:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return u}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=r.a.createContext({}),l=function(e){var t=r.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},b=function(e){var t=l(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=l(a),d=n,u=b["".concat(i,".").concat(d)]||b[d]||m[d]||o;return a?r.a.createElement(u,s(s({ref:t},p),{},{components:a})):r.a.createElement(u,s({ref:t},p))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);