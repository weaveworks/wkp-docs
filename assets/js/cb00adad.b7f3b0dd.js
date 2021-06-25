(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{187:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return p}));var r=a(3),n=a(7),s=(a(0),a(214)),i={title:"Managing Secrets"},c={unversionedId:"cluster-operations/managing-secrets",id:"version-2.5.0/cluster-operations/managing-secrets",isDocsHomePage:!1,title:"Managing Secrets",description:"Kubernetes secrets provide a way to distribute sensitive data into Pods. Secrets are just another object the Kubernetes API can manage and are represented in YAML manifest files. The sensitive data part of a secret will be encoded in base64 format, meaning they are not encrypted. This raises an issue, as committing these manifests in Version Control Systems like Git is not secure.",source:"@site/versioned_docs/version-2.5.0/cluster-operations/managing-secrets.md",slug:"/cluster-operations/managing-secrets",permalink:"/docs/cluster-operations/managing-secrets",editUrl:"https://github.com/weaveworks/wkp-docs/tree/main/versioned_docs/version-2.5.0/cluster-operations/managing-secrets.md",version:"2.5.0",sidebar:"version-2.5.0/docs",previous:{title:"Securing NATS",permalink:"/docs/cluster-operations/nats-tls"},next:{title:"Managing the Sealing Key",permalink:"/docs/cluster-operations/sealing-key"}},l=[{value:"Example: Creating a sealed secret",id:"example-creating-a-sealed-secret",children:[]},{value:"Scopes",id:"scopes",children:[]},{value:"Key Renewal",id:"key-renewal",children:[]},{value:"Disaster Recovery",id:"disaster-recovery",children:[]},{value:"Reusing the Sealing Key in Multiple Clusters",id:"reusing-the-sealing-key-in-multiple-clusters",children:[]},{value:"Secret Rotation",id:"secret-rotation",children:[{value:"Further Reading",id:"further-reading",children:[]}]}],o={toc:l};function p(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},o,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Kubernetes secrets provide a way to distribute sensitive data into Pods. Secrets are just another object the Kubernetes API can manage and are represented in YAML manifest files. The sensitive data part of a secret will be encoded in base64 format, meaning they are not encrypted. This raises an issue, as committing these manifests in Version Control Systems like Git is not secure."),Object(s.b)("p",null,Object(s.b)("a",{parentName:"p",href:"https://github.com/bitnami-labs/sealed-secrets"},"Bitnami Sealed Secrets")," is a solution to this problem, providing one-way encrypted secrets that are safe to commit in Git repositories."),Object(s.b)("p",null,"Sealed secrets are based on asymmetric cryptography, making use of a certificate and private key pair in a similar way as to how GPG keys work. The certificate/public key part can be used locally with ",Object(s.b)("inlineCode",{parentName:"p"},"kubeseal")," to encrypt a secret, which can be applied to a Kubernetes cluster as any other resource.\nThe ",Object(s.b)("inlineCode",{parentName:"p"},"sealed-secrets-controller")," running in the ",Object(s.b)("inlineCode",{parentName:"p"},"kube-system")," namespace by default, will in turn decrypt the sealed secret, using the private key, to a normal Secret resource that can be mounted to Pods in the cluster."),Object(s.b)("p",null,"In the cluster creation step, if you would like to use a specific certificate - key pair, specify it in the main configuration file at ",Object(s.b)("inlineCode",{parentName:"p"},"setup/config.yaml")," and WKP will launch the sealed secrets controller with the provided key.\nIf left blank a new self signed certificate - key pair is created and stored at ",Object(s.b)("inlineCode",{parentName:"p"},"setup/sealed-secrets-cert.crt")," and ",Object(s.b)("inlineCode",{parentName:"p"},"setup/sealed-secrets-key"),"."),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"Do not store the private key in any VCS repository.")," It should be stored in a password manager of your choice or retrieved from the Secret in the Kubernetes cluster. Compromising the private key annuls any protection provided by the sealed secrets so it needs to be handled with utmost care."),Object(s.b)("h3",{id:"example-creating-a-sealed-secret"},"Example: Creating a sealed secret"),Object(s.b)("p",null,"Once the cluster is ready, you can create a sealed secret as described in the following example from ",Object(s.b)("a",{parentName:"p",href:"https://engineering.bitnami.com/articles/sealed-secrets.html"},"bitnami"),":"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-bash"},'# Creates an example secret and encrypt it immediately:\nkubectl create secret generic --dry-run --output json \\\n  mysecret  --from-literal=password=supersekret |\n  kubeseal > mysealedsecret.json\n\n# Add the created sealed secret to your manifests directory of your git repo\n# Note this is now safe to do.\ncp mysealedsecret.json /path/to/my/repo/cluster/manifests/mysealedsecret.json\n\n# Commit and push\ncd /path/to/my/repo\ngit add cluster/manifests/mysealedsecret.json\ngit commit -m "Added a sealed secret"\ngit push\n\n# After a few minutes flux will apply the manifest to the cluster\n# The original secret now exists, like magic!\nkubectl get secret mysecret\n')),Object(s.b)("h3",{id:"scopes"},"Scopes"),Object(s.b)("p",null,"Enforcing RBAC for users of a Kubernetes cluster usually entails separating user access to specific namespaces. To ensure that reading a sealed secret is safe, they can include in the encryption process the name of the secret and the namespace. This is the case of sealing a secret in the ",Object(s.b)("inlineCode",{parentName:"p"},"strict")," scope. An example of why this is essential is the following:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"Let's assume a user of namespace ",Object(s.b)("inlineCode",{parentName:"li"},"foo")," reads a sealed secret manifest from Git that is meant for namespace ",Object(s.b)("inlineCode",{parentName:"li"},"bar"),"."),Object(s.b)("li",{parentName:"ul"},"He could change the namespace field from ",Object(s.b)("inlineCode",{parentName:"li"},"bar")," to ",Object(s.b)("inlineCode",{parentName:"li"},"foo")," and create the sealed secret in his namespace ",Object(s.b)("inlineCode",{parentName:"li"},"foo")," and read out the value once the controller decrypts it.")),Object(s.b)("p",null,"Same example is valid for RBAC within the same namespace, e.g. if the user could only access a secret with a specific name in namespace ",Object(s.b)("inlineCode",{parentName:"p"},"foo"),". By changing the name of the secret to ",Object(s.b)("inlineCode",{parentName:"p"},"foo")," he could read the decrypted value once the controller decrypts it to a secret he can access."),Object(s.b)("p",null,"The 3 scopes of sealed secrets are:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},'strict (default): the secret must be sealed with exactly the same name and namespace. These attributes become part of the encrypted data and thus changing name and/or namespace would lead to "decryption error".'),Object(s.b)("li",{parentName:"ul"},"namespace-wide: you can freely rename the sealed secret within a given namespace."),Object(s.b)("li",{parentName:"ul"},"cluster-wide: the secret can be unsealed in any namespace and can be given any name.")),Object(s.b)("p",null,"You can select the scope of a secret by passing the ",Object(s.b)("inlineCode",{parentName:"p"},"--scope")," flag to kubeseal:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubeseal --scope cluster-wide < SECRET.yaml > SEALED_SECRET.json\n")),Object(s.b)("p",null,"If the flag is not passed the default scope is ",Object(s.b)("inlineCode",{parentName:"p"},"strict"),"."),Object(s.b)("h3",{id:"key-renewal"},"Key Renewal"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"Key rotation")," is critical to the security of any cryptosystem. The recommended procedure of securely managing sealed secrets is referred to as ",Object(s.b)("inlineCode",{parentName:"p"},"key renewal")," and it differs from traditional key rotation in ways explained below. For further reading, please refer to the ",Object(s.b)("a",{parentName:"p",href:"https://github.com/bitnami-labs/sealed-secrets#secret-rotation"},"Sealed Secrets README")," on Github."),Object(s.b)("p",null,"Traditionally, in the example of an access key rotation works by:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},"Creating a new key"),Object(s.b)("li",{parentName:"ol"},"Updating all applications to use the new key and validating that they are working"),Object(s.b)("li",{parentName:"ol"},"Labelling as expired the old key and optionally deleting it")),Object(s.b)("p",null,"In dealing with sealed secrets in Kubernetes the process differs in these ways:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"Creating a new key and reencrypting the secrets with the new one is not enough, the periodical rotation of the actual secret value is also advised"),Object(s.b)("li",{parentName:"ul"},'"Expired" keys are not automatically deleted, they are kept in a list in the controller and can still be used to decrypt sealed secrets that have been sealed with the old certificate')),Object(s.b)("p",null,"Key renewal occurs automatically at the time interval passed to the controller with the ",Object(s.b)("inlineCode",{parentName:"p"},"--key-renew-period")," flag, which defaults to 30 days."),Object(s.b)("h2",{id:"disaster-recovery"},"Disaster Recovery"),Object(s.b)("p",null,"If you suspect that a private key has been compromised you can consider that all sealed secrets that have been encrypted with it are compromised as well. In this case you need to change all sensitive values of the secrets, create a new sealing key and reencrypt all secrets. The steps in this case are:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Change all sensitive data of your secrets")),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Retrieve the compromised private key from the cluster and delete it"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubectl get secret --namespace kube-system sealed-secrets-key --output yaml > compromised-sealed-secrets-key\nkubectl delete secret --namespace kube-system sealed-secrets-key\n"))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Restart the sealed-secrets-controller pod"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubectl delete pods --namespace kube-system sealed-secrets-controller-<hash>\n")),Object(s.b)("p",{parentName:"li"},"When the new pod starts, it will create a new private key")),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Get the new certificate and store it locally"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubeseal --fetch-cert > new-certificate.crt\n"))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Reseal your secrets with the new certificate"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubeseal --cert ./new-certificate.crt < SECRET.yaml --output yaml > SEALED_SECRET.yaml\n"))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Commit them to your repo to create them"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},'git add cluster/manifests/SEALED_SECRET.yaml\ngit commit -m "Added back re-sealed secret"\ngit push\n')))),Object(s.b)("p",null,"The compromised secret key retrieved above can be used to decrypt any old sealed secrets if needed:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubeseal < SEALED_SECRET.yaml --recovery-unseal --recovery-private-key compromised-sealed-secrets-key --output yaml > UNSEALED_SECRET.yaml\n")),Object(s.b)("h2",{id:"reusing-the-sealing-key-in-multiple-clusters"},"Reusing the Sealing Key in Multiple Clusters"),Object(s.b)("p",null,"For architectures where multiple clusters are managed by GitOps, reusing the same sealing key can decrease the operational complexity, if this process is within your security constraints. Keys are stored as standard Kubernetes secrets within a cluster, in the same namespace as the controller, usually ",Object(s.b)("inlineCode",{parentName:"p"},"kube-system")," under the name ",Object(s.b)("inlineCode",{parentName:"p"},"sealed-secrets-key"),".\nTo share keys between two clusters, assuming one cluster is operational and the second is being created:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Extract the key from the first one"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"kubectl get secret --namespace kube-system -l sealedsecrets.bitnami.com/sealed-secrets-key --output yaml > MASTER.yaml\n"))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Commit it in the repo of your second cluster"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},'cp MASTER.yaml /path/to/my/second/repo/cluster/manifests\ncd /path/to/my/second/repo\ngit add cluster/manifests/MASTER.yaml\ngit commit -m "Added master key from cluster A"\ngit push\n'))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Launch the workloads of the cluster as normal. As the sealed-secrets-controller starts it will read the key value from the secret and use it for decryption."))),Object(s.b)("h2",{id:"secret-rotation"},"Secret Rotation"),Object(s.b)("p",null,"To create a WKP cluster, the required secret values are a deploy key for the git repository, alongside your docker credentials. These two values are sealed, with a similar process as described in the example section above, and stored in the repository in ",Object(s.b)("inlineCode",{parentName:"p"},"cluster/platform/gitops-secrets.yaml"),"."),Object(s.b)("p",null,"To rotate the sealed secret values when a new key is in place, first change directory to the top level directory of your github repository, then:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Fetch the certificate for the new key. (",Object(s.b)("inlineCode",{parentName:"p"},"kubeseal")," is installed in the ",Object(s.b)("inlineCode",{parentName:"p"},"bin")," directory of your installation)"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},"./bin/kubeseal --fetch-cert > new-sealed-secrets-cert.crt\n"))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"Run ",Object(s.b)("inlineCode",{parentName:"p"},"wk gitops generate-secrets")," (again, from the top level directory of your git repository) passing the new certificate, and push the new changes to the remote repository:"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},'wk gitops generate-secrets --git-private-key-file=setup/repo-key-<cluster-name> --docker-io-user=<my-docker-user> --docker-io-password-file=/path/to/my/docker/password --sealed-secrets-cert=new-sealed-secrets-cert.crt\ngit add ./cluster/platform/gitops-secrets.yaml\ngit commit -m "Rotated gitops-secrets.yaml"\ngit push\n'))),Object(s.b)("li",{parentName:"ol"},Object(s.b)("p",{parentName:"li"},"After a few minutes the controller should decrypt the new sealed secrets.\nYou can verify this from the logs, as for example:"),Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",{parentName:"pre",className:"language-bash"},'kubectl logs -n kube-system -l name=sealed-secrets-controller\n...\n2020/04/14 11:48:57 Event(v1.ObjectReference{Kind:"SealedSecret", Namespace:"wkp-ui", Name:"wkp-ui-git-deploy-key", UID:"2f58d047-7e3b-11ea-82fe-42010a840019", APIVersion:"bitnami.com/v1alpha1", ResourceVersion:"10170", FieldPath:""}): type: \'Normal\' reason: \'Unsealed\' SealedSecret unsealed successfully\n...\n')))),Object(s.b)("p",null,"This process rotates just the encrypted values in the sealed secrets stored in the git repository. It is recommended\nto rotate the actual secret values, in this case these are the docker credentials and the git deploy key.\nIn that case, after step 4 it is required to restart the pods in the cluster that will mount the updated ",Object(s.b)("inlineCode",{parentName:"p"},"Secrets"),"."),Object(s.b)("h3",{id:"further-reading"},"Further Reading"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",{parentName:"li",href:"https://github.com/bitnami-labs/sealed-secrets"},"Sealed Secrets github page")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",{parentName:"li",href:"https://www.katacoda.com/courses/kubernetes/sealed-secrets"},"Katacoda tutorial on creating Sealed Secrets")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",{parentName:"li",href:"https://playbook.stakater.com/content/workshop/sealed-secrets/management.html"},"Key Management Playbook"))))}p.isMDXComponent=!0},214:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return u}));var r=a(0),n=a.n(r);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=n.a.createContext({}),p=function(e){var t=n.a.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},b=function(e){var t=p(e.components);return n.a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),b=p(a),m=r,u=b["".concat(i,".").concat(m)]||b[m]||d[m]||s;return a?n.a.createElement(u,c(c({ref:t},o),{},{components:a})):n.a.createElement(u,c({ref:t},o))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var o=2;o<s;o++)i[o]=a[o];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);