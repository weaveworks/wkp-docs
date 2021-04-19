---
title: "Cluster creation on EKS"
---

### Install the dependencies

On the computer that will be used for the installation, you need to install:

- [git](https://www.atlassian.com/git/tutorials/install-git)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- The `wk` binary. You can ensure it is in your path by running `wk version`

### Entitlements

Ensure that `wk` can load a valid [entitlements](/docs/getting-started/entitlements) file.

### Install WKP on an EKS cluster

First, create a directory which will contain the cluster management scripts and binaries.

```bash
mkdir wkp-eks-cluster && cd wkp-eks-cluster
wk setup install --entitlements=/path/to/my/entitlements
```

The main configuration file will be unpacked at `setup/config.yaml`.

The required values are your git provider organization or user, your Docker Hub user, and an absolute path to a file containing your Docker Hub password:

```bash
mkdir -p ~/.wks
echo 'my-dockerhub-password' > ~/.wks/dockerhub-password
chmod 600 ~/.wks/dockerhub-password
```

Enter your `gitProvider`, `gitProviderOrg`, `dockerIOUser`, and `dockerIOPasswordFile` in your `setup/config.yaml`. (See [Git Config Repository](/getting-started/git-config-repository) for details about git parameters)

Set the `track` field to `eks`, and optionally, set the `clusterName`, `clusterRegion`, and `kubernetesVersion` fields.

You can provide a path to an eksctl config file directly to configure any of the available options, or set some of the commonly used configuration in the `setup/config.yaml` file.

> Compatible with this version of WKP is eksctl's `ClusterConfig`, `apiVersion: eksctl.io/v1alpha5`.
> Also, note that if an eksctl config file path is provided, it will override any other fields set in the eksConfig
> section of the `setup/config.yaml`.

A sample eksctl config file is provided in the cluster repository at `setup/eksctl-config.yaml`, for the documentation of its schema,
please refer to the [eksctl docs](https://eksctl.io/). The config file used will be copied to `setup/eksctl-config.yaml` and
committed to the cluster repository.

The WKP UI is not publicly accessible by default. If you want to expose it via an Application Load Balancer, set the `uiALBIngress` field to `true`.

Finally, enter any node group configuration you may require:

```bash
vim setup/config.yaml
```

Example snippet of `config.yaml`:

```yaml
track: eks
clusterName: my-cluster
gitProvider: gitlab
gitUrl: git@git.acme.org:app-team/dev-cluster.git
dockerIOUser: my-docker-user
dockerIOPasswordFile: /home/my-user/.wks/my-dockerhub-password
```

WKP uses a personal access token to create the cluster repository on GitHub. The token needs to have permissions in
the `repo` scope. The github documentation on how to create one can be found on this [page](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Once you have created one,
set the environment variable for it:

```bash
export GITHUB_TOKEN=my-token
```

Finally, make sure your AWS CLI credentials are [configured properly](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html).

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

#### via Application Load Balancer

Ensure that the `uiALBIngress` field is set to `true`:

```yaml
eksConfig:
  uiALBIngress: true
```

To access the WKP UI via its assigned ingress, get the allocated address:

```bash
kubectl get ingress --namespace wkp-ui wkp-ui-alb-ingress
NAME                 HOSTS   ADDRESS                        PORTS   AGE
wkp-ui-alb-ingress   *       my-wkp-cluster.mycompany.com   80      7m5s
```

and navigate to it from your browser.

In this example the address is `my-wkp-cluster.mycompany.com`.

### Specifications of managed nodegroups

The specifications of the managed nodegroups of the cluster can be specified in a YAML file.

An example file can be seen below:

```yaml
managedNodeGroups:
  - name: managed-1
    instanceType: m5.large
    minSize: 2
    desiredCapacity: 3
    maxSize: 4
    availabilityZones: ["us-east-2a", "us-east-2b"]
    volumeSize: 20
    ssh:
      allow: true
      publicKeyPath: ~/.ssh/id_rsa.pub
    labels: { role: worker }
    tags:
      nodegroup-role: worker
    iam:
      withAddonPolicies:
        externalDNS: true
        certManager: true
```

Once created, save it inside of the `cluster/platform` directory,
and set the path, either relative from `cluster/platform` or absolute, in your `setup/config.yaml`.

```yaml
eksConfig:
  nodeGroups: []
  managedNodeGroupFile: managedNodeGroups.yaml
```

### Node Requirements

Clusters can run on a single node or multiple, depending on the processing requirements.
The default node group WKP will deploy on EKS, is of instance type m5.large.
A [recommended minimum](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#before-you-begin) for nodes is 2 CPU cores and 2GB of RAM.

If you are building a large cluster the [Kubernetes docs](https://kubernetes.io/docs/setup/best-practices/cluster-large/) cover the specifications.

Recommended instance types for AWS:

- 1-5 nodes: m3.medium
- 6-10 nodes: m3.large
- 11-100 nodes: m3.xlarge
- 101-250 nodes: m3.2xlarge
- 251-500 nodes: c4.4xlarge
- more than 500 nodes: c4.8xlarge

### Delete a WKP cluster

You can use the `cleanup.sh` script:

```bash
./setup/cleanup.sh
```
