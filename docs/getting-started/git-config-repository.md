---
title: "Managing the Git Configuration Repository"
---

The _Git Config Repository_ is where the cluster configuration is stored. It contains the cluster definition and your application manifests.

[Flux](https://github.com/fluxcd/flux) is used to sync the Git Config Repository and the cluster so its important to have it configured correctly. WKP supports GitHub and GitLab (Cloud or self-hosted).

## Initial configuration during `wk setup`

In order to create a cluster, we first need to define and configure its properties. To do that, we run `wk setup install` which generates a set of files in the current directory, that will be used for the configuration of our new cluster. The directory also includes a new local git repository that tracks the newly generated files.

The generated files include:
- `/bin`
   - `eksctl`: used when creating an EKS cluster
   - `footloose`: used when creating a Footloose cluster
   - `hub`: used to interact with GitHub
   - `ignite`: used to run a Footloose cluster with an ignite backend
   - `jk`: used to generate configuration
   - `kubeseal`: used to interact with sealed secrets 
- `/cluster`
   - `/manifests`: manifests for user-defined workloads that need to run on the cluster will live here
   - `/platform`: additional WKP runtime configuration files
- `/doc`: creation guides
- `/setup`
   - `config.yaml`: main configuration file used when creating a cluster

After running `wk setup install` we configure WKP by editing `config.yaml`. WKP needs to know a little bit about how and where you're hosting your git repository. The main parameter in `config.yaml` is the `gitProvider` and can be set either to `github` or `gitlab`.

A detailed documentation for `config.yaml` can be found in `config.yaml` file itself.

### GitHub

When hosting your config repository on GitHub:.

1. In _config.yaml_ set `gitProvider` to `github`
1. In _config.yaml_ set `gitProviderOrg` to the Github organization or user WKP should create the repository under.
1. Continue following the instructions in one of the _Cluster Creation_ guides.

### GitLab

> _Note:_ For this document, replace:
>
> - `gitlab.example.com` with your company's gitlab host address
> - `my-example-repo` with your desired repo name
> - `my-user` with your GitLab username or groupname

When hosting the repository on GitLab:

1. In _`config.yaml`_ set `gitProvider` to `gitlab`
1. visit gitlab.example.com/projects/new and create a new repo, `my-example-repo`
   _Note:_ WKP does not support repo creation on Gitlab currently, so this is a required step.
1. In _`config.yaml`_ set `gitUrl` to your newly created repository. e.g. `git@gitlab.example.com:my-user/my-example-repo`
1. Continue following the instructions in one of the _Cluster Creation_ guides until you are prompted to run `wk setup run`. When you run `wk setup run` a deploy key that gives the cluster read/write access to the git repository will be generated. This deploy key needs to be installed in the GitLab UI:
1. visit gitlab.example.com/my-user/my-example-repo/settings/repository:
   1. navigate to the `Deploy Keys` section, and `Expand` the section
   1. create a `Title`, it can be anything
   1. Paste the deploy key provided in the command line output into the `Key` section.
   1. **\[IMPORTANT\]** ensure `Write access allowed` is checked
   1. click `Add key`
1. Re-run `wk setup run` again and continue the _Cluster Creation_ instructions.

## SSH configuration

WKP requires using **SSH** to sync the git config repo and the cluster. To provide additional security WKP enables `StrictHostKeyChecking` and checks that the server providing the git config repo matches a public key that we have stored. For popular git providers like GitHub we include the public key with WKP and no further configuration is needed. For self hosted repositories like Gitlab we need to retrieve and store the server's public key. We save it in a file called `known_hosts`.

### Customizing `known_hosts`

During `wk setup run` your `gitProvider` and `gitUrl` are checked. If we determine a custom domain is being used we will automatically connect to the server, retrieve the public keys and save them to `cluster/platform/ssh_config/known_hosts`. This `known_hosts` file will then be loaded into the `flux` and `gitops-repo-broker` and any other pod that needs to talk to the git config repo.

If you change the keys on your ssh server you may need to regenerate `known_hosts`.
```
ssh-keyscan gitlab.example.com > cluster/platform/ssh_config/known_hosts
```

Test that the new `known_hosts` file works
```
ssh -oBatchMode=yes -o UserKnownHostsFile=cluster/platform/ssh_config/known_hosts -T git@gitlab.example.com
```

Commit and push to update the cluster
```
git commit -m "Updated known_hosts"
git push origin master
```
