---
title: "Managing Secrets"
---

Kubernetes secrets provide a way to distribute sensitive data into Pods. Secrets are just another object the Kubernetes API can manage and are represented in YAML manifest files. The sensitive data part of a secret will be encoded in base64 format, meaning they are not encrypted. This raises an issue, as committing these manifests in Version Control Systems like Git is not secure.

[Bitnami Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) is a solution to this problem, providing one-way encrypted secrets that are safe to commit in Git repositories.

Sealed secrets are based on asymmetric cryptography, making use of a certificate and private key pair in a similar way as to how GPG keys work. The certificate/public key part can be used locally with `kubeseal` to encrypt a secret, which can be applied to a Kubernetes cluster as any other resource.
The `sealed-secrets-controller` running in the `kube-system` namespace by default, will in turn decrypt the sealed secret, using the private key, to a normal Secret resource that can be mounted to Pods in the cluster.

In the cluster creation step, if you would like to use a specific certificate - key pair, specify it in the main configuration file at `setup/config.yaml` and WKP will launch the sealed secrets controller with the provided key.
If left blank a new self signed certificate - key pair is created and stored at `setup/sealed-secrets-cert.crt` and `setup/sealed-secrets-key`.

**Do not store the private key in any VCS repository.** It should be stored in a password manager of your choice or retrieved from the Secret in the Kubernetes cluster. Compromising the private key annuls any protection provided by the sealed secrets so it needs to be handled with utmost care.

### Example: Creating a sealed secret

Once the cluster is ready, you can create a sealed secret as described in the following example from [bitnami](https://engineering.bitnami.com/articles/sealed-secrets.html):

```bash
# Creates an example secret and encrypt it immediately:
kubectl create secret generic --dry-run --output json \
  mysecret  --from-literal=password=supersekret |
  kubeseal > mysealedsecret.json

# Add the created sealed secret to your manifests directory of your git repo
# Note this is now safe to do.
cp mysealedsecret.json /path/to/my/repo/cluster/manifests/mysealedsecret.json

# Commit and push
cd /path/to/my/repo
git add cluster/manifests/mysealedsecret.json
git commit -m "Added a sealed secret"
git push

# After a few minutes flux will apply the manifest to the cluster
# The original secret now exists, like magic!
kubectl get secret mysecret
```

### Scopes

Enforcing RBAC for users of a Kubernetes cluster usually entails separating user access to specific namespaces. To ensure that reading a sealed secret is safe, they can include in the encryption process the name of the secret and the namespace. This is the case of sealing a secret in the `strict` scope. An example of why this is essential is the following:

- Let's assume a user of namespace `foo` reads a sealed secret manifest from Git that is meant for namespace `bar`.
- He could change the namespace field from `bar` to `foo` and create the sealed secret in his namespace `foo` and read out the value once the controller decrypts it.

Same example is valid for RBAC within the same namespace, e.g. if the user could only access a secret with a specific name in namespace `foo`. By changing the name of the secret to `foo` he could read the decrypted value once the controller decrypts it to a secret he can access.

The 3 scopes of sealed secrets are:

- strict (default): the secret must be sealed with exactly the same name and namespace. These attributes become part of the encrypted data and thus changing name and/or namespace would lead to "decryption error".
- namespace-wide: you can freely rename the sealed secret within a given namespace.
- cluster-wide: the secret can be unsealed in any namespace and can be given any name.

You can select the scope of a secret by passing the `--scope` flag to kubeseal:

```bash
kubeseal --scope cluster-wide < SECRET.yaml > SEALED_SECRET.json
```

If the flag is not passed the default scope is `strict`.

### Key Renewal

`Key rotation` is critical to the security of any cryptosystem. The recommended procedure of securely managing sealed secrets is referred to as `key renewal` and it differs from traditional key rotation in ways explained below. For further reading, please refer to the [Sealed Secrets README](https://github.com/bitnami-labs/sealed-secrets#secret-rotation) on Github.

Traditionally, in the example of an access key rotation works by:

1. Creating a new key
2. Updating all applications to use the new key and validating that they are working
3. Labelling as expired the old key and optionally deleting it

In dealing with sealed secrets in Kubernetes the process differs in these ways:

- Creating a new key and reencrypting the secrets with the new one is not enough, the periodical rotation of the actual secret value is also advised
- "Expired" keys are not automatically deleted, they are kept in a list in the controller and can still be used to decrypt sealed secrets that have been sealed with the old certificate

Key renewal occurs automatically at the time interval passed to the controller with the `--key-renew-period` flag, which defaults to 30 days.

## Disaster Recovery

If you suspect that a private key has been compromised you can consider that all sealed secrets that have been encrypted with it are compromised as well. In this case you need to change all sensitive values of the secrets, create a new sealing key and reencrypt all secrets. The steps in this case are:

1. Change all sensitive data of your secrets

2. Retrieve the compromised private key from the cluster and delete it

   ```bash
   kubectl get secret --namespace kube-system sealed-secrets-key --output yaml > compromised-sealed-secrets-key
   kubectl delete secret --namespace kube-system sealed-secrets-key
   ```

3. Restart the sealed-secrets-controller pod

   ```bash
   kubectl delete pods --namespace kube-system sealed-secrets-controller-<hash>
   ```

   When the new pod starts, it will create a new private key

4. Get the new certificate and store it locally

   ```bash
   kubeseal --fetch-cert > new-certificate.crt
   ```

5. Reseal your secrets with the new certificate

   ```bash
   kubeseal --cert ./new-certificate.crt < SECRET.yaml --output yaml > SEALED_SECRET.yaml
   ```

6. Commit them to your repo to create them

   ```bash
   git add cluster/manifests/SEALED_SECRET.yaml
   git commit -m "Added back re-sealed secret"
   git push
   ```

The compromised secret key retrieved above can be used to decrypt any old sealed secrets if needed:

```bash
kubeseal < SEALED_SECRET.yaml --recovery-unseal --recovery-private-key compromised-sealed-secrets-key --output yaml > UNSEALED_SECRET.yaml
```

## Reusing the Sealing Key in Multiple Clusters

For architectures where multiple clusters are managed by GitOps, reusing the same sealing key can decrease the operational complexity, if this process is within your security constraints. Keys are stored as standard Kubernetes secrets within a cluster, in the same namespace as the controller, usually `kube-system` under the name `sealed-secrets-key`.
To share keys between two clusters, assuming one cluster is operational and the second is being created:

1. Extract the key from the first one

   ```bash
   kubectl get secret --namespace kube-system -l sealedsecrets.bitnami.com/sealed-secrets-key --output yaml > MASTER.yaml
   ```

2. Commit it in the repo of your second cluster

   ```bash
   cp MASTER.yaml /path/to/my/second/repo/cluster/manifests
   cd /path/to/my/second/repo
   git add cluster/manifests/MASTER.yaml
   git commit -m "Added master key from cluster A"
   git push
   ```

3. Launch the workloads of the cluster as normal. As the sealed-secrets-controller starts it will read the key value from the secret and use it for decryption.

## Secret Rotation

To create a WKP cluster, the required secret values are a deploy key for the git repository, alongside your docker credentials. These two values are sealed, with a similar process as described in the example section above, and stored in the repository in `cluster/platform/gitops-secrets.yaml`.

To rotate the sealed secret values when a new key is in place, first change directory to the top level directory of your github repository, then:

1. Fetch the certificate for the new key. (`kubeseal` is installed in the `bin` directory of your installation)

   ```bash
   ./bin/kubeseal --fetch-cert > new-sealed-secrets-cert.crt
   ```

2. Run `wk gitops generate-secrets` (again, from the top level directory of your git repository) passing the new certificate, and push the new changes to the remote repository:

   ```bash
   wk gitops generate-secrets --git-private-key-file=setup/repo-key-<cluster-name> --docker-io-user=<my-docker-user> --docker-io-password-file=/path/to/my/docker/password --sealed-secrets-cert=new-sealed-secrets-cert.crt
   git add ./cluster/platform/gitops-secrets.yaml
   git commit -m "Rotated gitops-secrets.yaml"
   git push
   ```

3. After a few minutes the controller should decrypt the new sealed secrets.
   You can verify this from the logs, as for example:

   ```bash
   kubectl logs -n kube-system -l name=sealed-secrets-controller
   ...
   2020/04/14 11:48:57 Event(v1.ObjectReference{Kind:"SealedSecret", Namespace:"wkp-ui", Name:"wkp-ui-git-deploy-key", UID:"2f58d047-7e3b-11ea-82fe-42010a840019", APIVersion:"bitnami.com/v1alpha1", ResourceVersion:"10170", FieldPath:""}): type: 'Normal' reason: 'Unsealed' SealedSecret unsealed successfully
   ...
   ```

This process rotates just the encrypted values in the sealed secrets stored in the git repository. It is recommended
to rotate the actual secret values, in this case these are the docker credentials and the git deploy key.
In that case, after step 4 it is required to restart the pods in the cluster that will mount the updated `Secrets`.

### Further Reading

- [Sealed Secrets github page](https://github.com/bitnami-labs/sealed-secrets)
- [Katacoda tutorial on creating Sealed Secrets](https://www.katacoda.com/courses/kubernetes/sealed-secrets)
- [Key Management Playbook](https://playbook.stakater.com/content/workshop/sealed-secrets/management.html)
