+++
title = "Cluster components on an existing cluster"
weight = 7
+++

### Install the dependencies

On the computer that will be used for the installation, you need to install:

- [git](https://www.atlassian.com/git/tutorials/install-git)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- The `wk` binary. You can ensure it is in your path by running `wk version`

### Cluster requirements

- Kubernetes 1.16+
- At least 1 master and at least 1 worker node.

### Entitlements

Ensure that `wk` can load a valid [entitlements]({{< ref "/getting-started/entitlements" >}}) file.

### Install the WKP cluster components on an existing cluster

First, create a directory which will contain the cluster management scripts and binaries.

```bash
mkdir wkp-cluster && cd wkp-cluster
{{<param "clicmd" >}} setup install --entitlements=/path/to/my/entitlements
```

The main configuration file will be unpacked at `setup/config.yaml`.

The required values are your git provider organization or user, your Docker Hub user, and an absolute path to a file containing your Docker Hub password:

```bash
mkdir -p ~/.wks
echo 'my-dockerhub-password' > ~/.wks/dockerhub-password
chmod 600 ~/.wks/dockerhub-password
```

Enter your `gitProvider`, `dockerIOUser`, and `dockerIOPasswordFile` in your `setup/config.yaml`. (See [Git Config Repository]({{< ref "/getting-started/git-config-repository" >}}) for details about git parameters)

Set the `track` field to `wks-components`.

Example snippet of `config.yaml`:

```yaml
track: wks-components
clusterName: my-cluster
gitProvider: gitlab
gitUrl: git@git.acme.org:app-team/dev-cluster.git
dockerIOUser: my-docker-user
dockerIOPasswordFile: /home/my-user/.wks/my-docker-user-dockerhub-password
```

WKP uses a personal access token to create the cluster repository on GitHub. The token needs to have permissions in
the `repo` scope. The github documentation on how to create one can be found on this [page](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Once you have created one,
set the environment variable for it:

```bash
export GITHUB_TOKEN=my-token
```

Now we are ready to install the components on the cluster. Make sure `kubectl` is connected to the correct cluster and run:

```bash
{{<param "clicmd" >}} setup run
```

### Access the WKP UI

To expose the WKP UI via wk ui command, run:

```bash
wk ui
```

You should now be able to view it at <http://localhost:8090>

To expose the WKP UI to a different port other than the default, run:

```bash
wk ui --port 8081
```
