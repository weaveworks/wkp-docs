+++
title = "Cluster creation on SSH nodes"
weight = 5
+++

### Install the dependencies

On the computer that will be used for the installation, you need to install:

- [git](https://www.atlassian.com/git/tutorials/install-git)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- The `{{<param "clicmd" >}}` binary. You can ensure it is in your path by running `{{<param "clicmd" >}} version`

### Entitlements

Ensure that `wk` can load a valid [entitlements]({{< ref "/getting-started/entitlements" >}}) file.

### Install WKP on SSH Nodes

> Please ensure the nodes fulfill the requirements described in [cluster node requirements]({{< ref "/deploying-wkp/hosts" >}}).
>
> If your cluster has multiple control plane nodes, to ensure high availability it is recommended to [setup a control plane load balancer]({{< ref "/tasks/control-plane-load-balancers" >}}).

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

Enter your `gitProvider`, `gitProviderOrg`, `dockerIOUser`, and `dockerIOPasswordFile` in your `setup/config.yaml`. (See [Git Config Repository]({{< ref "/getting-started/git-config-repository" >}}) for details about git parameters)

Set the `track` field to `wks-ssh`, and optionally, set the `clusterName`.
In the `wksConfig` section you can specify the version and other configuration for your cluster
depending on your infrastructure.

In the `wksConfig.sshConfig` section, please provide a `sshUser` that has passwordless sudo access to your nodes, and
the path to the matching private `sshKeyFile`.

In the `machines` array, specify the `role` of each node, and its private and public IP address. At least 1 `master`
and 1 `worker` node is required.

Example:

```yaml
machines:
  - role: master
    publicAddress: 35.195.66.60
    privateAddress: 10.132.0.21
  - role: worker
    publicAddress: 34.77.149.149
    privateAddress: 10.132.0.26
```

If you have a **load balancer** configured to route api-server (`:6443`) traffic to all of the `master` nodes specified in `machines`, you can provide its **public** IP Address in `wksConfig.controlPlaneLbAddress`. (_See [Control plane load balancers]({{< ref "/tasks/control-plane-load-balancers" >}}) for details._)

WKP uses a personal access token to create the cluster repository on GitHub. The token needs to have permissions in
the `repo` scope. The github documentation on how to create one can be found on this [page](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Once you have created one,
set the environment variable for it:

```bash
export GITHUB_TOKEN=my-token
```

#### EKS-D
If you would like to run EKS-D in your cluster using the experimental support for EKS-D in WKP, please follow the instructions at: [Using the EKS-D Kubernetes distribution]({{< ref "/tasks/using-the-eks-d-distribution" >}})


Now we are ready to install the cluster:

```bash
{{<param "clicmd" >}} setup run
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

To access the WKP UI via its assigned ingress, get the allocated address:

```console
kubectl get ingress --namespace wkp-ui wkp-ui-alb-ingress
NAME                 HOSTS   ADDRESS                        PORTS   AGE
wkp-ui-alb-ingress   *       my-wkp-cluster.mycompany.com   80      7m5s
```

and navigate to it from your browser.

In this example the address is `my-wkp-cluster.mycompany.com`.

### Delete a WKP cluster

You can use the `cleanup.sh` script:

```bash
./setup/cleanup.sh {{<param "clicmd" >}}
```
