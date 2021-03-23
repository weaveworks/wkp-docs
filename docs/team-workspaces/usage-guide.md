+++
title = "Usage guide"
weight = 1
+++


## How to: Enable the team workspaces feature

To enable the team workspaces feature edit the `setup/config.yaml` file, set the `enabledFeatures: teamWorkspaces`
field to `true`, commit and push to the cluster repository.

After a few seconds, the team workspaces components are deployed in the `wkp-workspaces` namespace.

## How To: Create and use a team workspace

The team workspaces feature supports the creation of repositories in either GitHub or GitLab. It also supports self-hosted instances of the above.

New team workspace repositories will be created in an organization. A personal access token is therefore needed for the succesful creation of the workspace repository and the setup of its deploy keys.

### Using a GitHub token

1. Choose a user that is a member of your organization. Using the GitHub UI, create a personal access token for this user that has `repo` and `admin:org` permissions and store it in an environment variable i.e.

    ```bash
    export GITHUB_TOKEN=...
    ```

1. Run the following command to generate a sealed secret manifest for the token:

    ```bash
    wk workspaces add-provider --type github --token $GITHUB_TOKEN --secret-name github-token
    ```

    The `--secret-name` parameter indicates the name of the secret that will be created in the cluster. The name of the secret needs to be unique as there can be more than one git providers used at any given point.

    For self-hosted instances, you need to also specify the `--hostname` parameter:

    ```bash
    wk workspaces add-provider --type github --token $GITHUB_TOKEN --secret-name github-token --hostname github.wkp.weave.works
    ```

    If this parameter is not specified, the `--hostname` parameter will default to `github.com`
    After running this command, a new manifest containing a sealed secret for the git provider token should be generated in the `./cluster/platform/workspaces` directory.

1. Push the sealed secret to the config repository, so that flux can apply it:

    ```bash
    git add ./cluster/platform/workspaces/git-provider-github-token.yaml
    git commit -m "Add git provider token"
    git push origin master
    ```

    This step can be skipped if the `--git-commit-push` parameter is present in the previous step.

### Using a GitLab token

1. Choose a user that is a member of your organization. Using the GitLab UI, create a personal access token for this user that has the `api` permission and store it in an environment variable i.e.

    ```bash
    export GITLAB_TOKEN=...
    ```

1. Run the following command to generate a sealed secret manifest for the token:

    ```bash
    wk workspaces add-provider --type gitlab --token $GITLAB_TOKEN --secret-name gitlab-token
    ```

    The `--secret-name` parameter indicates the name of the secret that will be created in the cluster. The name of the secret needs to be unique as there can be more than one git providers used at any given point.

    For self-hosted instances, you need to also specify the `--hostname` parameter:

    ```bash
    wk workspaces add-provider --type gitlab --token $GITLAB_TOKEN --secret-name gitlab-token --hostname gitlab.wkp.weave.works
    ```

    If this parameter is not specified, the `--hostname` parameter will default to `gitlab.com`
    After running this command, a new manifest containing a sealed secret for the git provider token should be generated in the `./cluster/platform/workspaces` directory.

1. Push the sealed secret to the config repository, so that flux can apply it:

    ```bash
    git add ./cluster/platform/workspaces/git-provider-gitlab-token.yaml
    git commit -m "Add git provider token"
    git push origin master
    ```

    This step can be skipped if the `--git-commit-push` parameter is present in the previous step.

### Adding a token manually

The `wk workspaces add-provider` command is a convenient way to add a provider token to the cluster. It is also possible to add a token manually which can be useful in cases where a solution like [SOPS](https://github.com/mozilla/sops) or [Vault](https://www.vaultproject.io/) is used to store secrets.

For example, the following command will generate a sealed secret manifest for the token:

```bash
kubectl create secret -n wkp-workspaces generic github-token --from-literal=token=$GITHUB_TOKEN --dry-run -o yaml | kubeseal -o yaml > ./cluster/platform/workspaces/git-provider-github-token.yaml
```

However, the generated secret will need some additional metadata in order for it to be used by other parts of the WKP platform. In those cases where a git provider token needs to be created manually, please ensure the following label and annotations are in place for the secret:

Label:

`wkp.weave.works/type: git-provider-token`

Annotations:

`wkp.weave.works/git-provider-type: github` or `wkp.weave.works/git-provider-type: gitlab` depending on the git provider used.

`wkp.weave.works/git-provider-hostname: github.com` or `wkp.weave.works/git-provider-hostname: gitlab.com` depending on the git provider used.

If a self-hosted instance is used then the `wkp.weave.works/git-provider-hostname` annotation needs to point to the hostname of that instance i.e. `wkp.weave.works/git-provider-hostname: git.wkp.weave.works`

You can use `kubectl` to create the above after the secret has been created:

```bash
kubectl label secrets github-token wkp.weave.works/type=git-provider-token
kubectl annotate secrets github-token wkp.weave.works/git-provider-type=github
kubectl annotate secrets github-token wkp.weave.works/git-provider-hostname=git.wkp.weave.works
```

### Creating a Workspace

Once the secret is deployed to the cluster, you can start creating team workspaces:

1. Create a Workspace manifest:

    ```yaml
    apiVersion: wkp.weave.works/v1beta1
    kind: Workspace
    metadata:
      name: demo
      namespace: wkp-workspaces
    spec:
      interval: 1m
      suspend: false
      gitProvider:
        type: github
        hostname: github.com
        tokenRef:
          name: github-token # the git provider token created previously
      gitRepository:
        name: team-victor # <- specify repository name
        owner: wkp-example-org # <- replace org with your GitHub organization
        branch: main # <- specify which repository branch should contain workloads (optional)
        path: "./" # <- specify which directory within the repository should contain workloads (optional)
        teams:
          - team-victor # <- specify which teams should be given access to the repository (optional)
      clusterScope:
        role: namespace-admin
        namespaces:
          - name: demo-app # <- target namespace
            resourceQuota: # <- optional field, defines a resource quota for namespace
              hard:
                requests.cpu: "1"
                requests.memory: 1Gi
                limits.cpu: "2"
                limits.memory: 2Gi
          - name: demo-db # <- another target namespace
            limitRange:   # <- optional field, defines a limit range for namespace
              limits:
              - type: Container
                max:
                  memory: 1Gi
                min:
                  memory: 500Mi
        networkPolicy: workspace-isolation # <- optional field, sets a predefined network policy in the target namespaces
    ```

2. Commit the manifest to the `cluster/manifests` directory in the config repository.

3. Wait until the `wkp-workspaces-controller` creates the namespace(s). This shouldn't take longer than the sync interval specified in the manifest plus a few seconds.
   - _Note: for troubleshooting, check the `wkp-workspaces-controller` logs (for applying failures) and `source-controller` logs (for GitHub API errors)_

4. Commit something to the newly created workspace repository (accessible by the workspace link in the UI). The controllers will reconcile your changes with the workspace namespace(s).

## Workspace CRD fields

The Workspace manifest defines three sections in its spec:

- `gitProvider`: The git provider which should host the git repository of the workspace and an
  access token for operating on the repo. Both GitHub and GitLab are supported.
- `gitRepository`: The repository details, which teams should get access to the workspace.
  The team needs to exist in the provider. The branch and path, if specified, restrict the locations that will be examined for workloads that need to be deployed. Only manifests checked in on the specified branch within the specified repository directory will be processed; "branch" defaults to "main" and "path" defaults to "./".
- `clusterScope`:
  - the list of namespaces that are in the workspace.
    For each of the namespaces, additional options may be defined:
    - `resourceQuota`: used to define constraints that limit aggregate resource consumption
    in the namespace
    - `limitRange`: used to define a policy to constrain resource allocations for pods or containers
    running in the namespace
  - the role of the members of the workspace with possible options:
    - `workspace-member`: members get limited permissions on the target namespaces
    - `namespace-admin`: members get admin permissions on the target namespaces
    - `cluster-admin`: members get cluster admin permissions
  - a network policy for the namespaces with possible option:
    - `workspace-isolation`: services created in the target namespaces cannot be accessed
    from namespaces outside of the workspace, and vice versa services running in namespaces
    outside of the workspace, cannot be accessed from within the namespace. If this field is not
    included in the manifest no network policy will be applied.

## Cluster access for workspace teams

After creating a workspace the teams specified in the `gitRepository` section will have access to the repository. These teams can manage the workspace by adding and removing manifests, committing and pushing.

It is also very useful for these teams to have `kubectl` access to the workspace to view logs and deployment statuses. Limited access to only those namespaces managed by the workspace is provided by a service account automatically generated during the creation process. To generate a kubeconfig file that uses this service account run:

```bash
wk workspaces kubeconfig --workspace-name demo
```

This will write the config to standard output and can be manually forwarded to the workspace teams. The teams can then save it to a file `demo-workspace-kubeconfig` use it like so:

```bash
kubectl --kubeconfig=demo-workspace-kubeconfig get pods
```

The kubeconfig file sets the default namespace to the first namespace listed in the Workspace definition. In this case the above command will show the pods in `demo-app`. To interact with other workspace namespaces (like `demo-db` in this case), the usual kubectl namespace flag can be provided: `kubectl --kubeconfig=demo-workspace-kubeconfig --namespace=demo-db get pods`

> If the cluster goes through a Kubernetes version upgrade, kubeconfig files will need to be regenerated.

## Updating a workspace

After a workspace has been created, it is possible to change multiple of its fields.
The modifiable fields of the workspace CRD consist of:

in the `spec` map:

- the `interval` of the reconciliation
- the `suspend` field, toggling the reconciliation on or off

in the `clusterScope` map:

- `namespaces` can be removed or added to the workspace. A namespace can only be in one workspace.
  If the namespace doesn't exist it will be created. When a namespace is removed from a workspace,
  the members of the workspace will not be able to access it anymore, and deployments will not be
  reconciled from the workspace repository.
  Workload running in a removed namespace are not terminated.

- `resource quotas` and `limit ranges`
