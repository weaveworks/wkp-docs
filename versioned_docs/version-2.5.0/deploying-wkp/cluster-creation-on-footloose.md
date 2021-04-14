---
title: "Installing WKP on Footloose"
---

### Install the dependencies

On the computer that will be used for the installation, you need to install:

- [git](https://www.atlassian.com/git/tutorials/install-git)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- The `wk` binary. You can ensure it is in your path by running `wk version`

### Install WKP on footloose containers

[Footloose](https://github.com/weaveworks/footloose) allows the creation of containers that emulate virtual machines.

It provides an easy way for deploying on a single machine and demoing WKP features.

First, create a directory which will contain the cluster management scripts and binaries.

It is required to provide a valid entitlements file for this step.

The default location for it is at `/home/${USER}/.wks/entitlements`, to specify a different location use the `--entitlements` flag:

```bash
mkdir wkp-footloose-cluster && cd wkp-footloose-cluster
wk setup install --entitlements=/path/to/my/entitlements
```

The main configuration file is unpacked at `setup/config.yaml`.

The required values are your git provider organization or user, your Docker Hub user, and an absolute path to a file containing your Docker Hub password:

```bash
mkdir -p ~/.wks
echo 'my-dockerhub-password' > ~/.wks/dockerhub-password
chmod 600 ~/.wks/dockerhub-password
```

Enter your `gitProvider`, `dockerIOUser`, and `dockerIOPasswordFile` in your `setup/config.yaml` (See [Git Config Repository](/getting-started/git-config-repository.md) for details about git parameters).

Optionally, set the `clusterName` and `kubernetesVersion` fields.

```bash
vim setup/config.yaml
```

Example snippet of `config.yaml`:

```yaml
track: wks-footloose
clusterName: my-cluster
gitProvider: gitlab
gitUrl: git@git.acme.org:app-team/dev-cluster.git
dockerIOUser: my-docker-user
dockerIOPasswordFile: /home/my-user/.wks/my-dockerhub-password
```

**Changes for Docker Desktop on MacOS**

Docker Desktop for Mac requires setting specific CIDR blocks. Make sure to set them in `config.yaml`:

```yaml
serviceCIDRBlocks: [192.168.0.0/16]
podCIDRBlocks: [172.30.0.0/16]
```

In the `footlooseConfig` section of `setup/config.yaml`, you can set the number of nodes according to your specifications and available resources, as well as the backend for creating them. The default is `docker`, which will deploy WKP on footloose containers.

Another possibility, available only on Linux due to its KVM requirement, is to use [ignite](https://github.com/weaveworks/ignite) to deploy WKP on lightweight VMs.

For this example we will use the default backend `docker`.

WKP uses a personal access token to create the cluster repository on GitHub. The token needs to have permissions in
the `repo` scope. The github documentation on how to create one can be found on this [page](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Once you have created one,
set the environment variable for it:

```bash
export GITHUB_TOKEN=my-token
```

#### EKS-D
If you would like to run EKS-D in your cluster using the experimental support for EKS-D in WKP, please follow the instructions at: [Using the EKS-D Kubernetes distribution](/tasks/using-the-eks-d-distribution.md)

Now we are ready to install the cluster:

```bash
wk setup run
```

### Access the WKP UI

#### via wk ui command

To expose the WKP UI via wk ui command, run:

```bash
wk ui
```

You should now be able to view it at <http://localhost:8090>

To expose the WKP UI to a different port other than the default, run:

```bash
wk ui --port 8081
```

### Delete a WKP cluster

You can use the `cleanup.sh` script:

```bash
./setup/cleanup.sh wk
```
