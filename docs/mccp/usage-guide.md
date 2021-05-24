---
title: "Usage guide"
---

## How to: Install MCCP via a Helm chart

Installing MCCP requires we:

1. Choose a database
2. Create a secret for docker repository
3. Determine the public IP address of the worker nodes
4. Install the MCCP helm chart
5. Check that MCCP has been installed (optional)

### 1. Choosing a database

MCCP supports **SQLite** and **PostgreSQL**. By default, MCCP will use **SQLite** on a _Host Volume_. For all the MCCP pods to be able to access the host volume they must be on the same node. We can do this by applying a label to one of the cluster worker nodes:

``` console
# list all worker nodes
$ kubectl get node --selector='!node-role.kubernetes.io/master' -o name
node/ip-192-168-40-197.eu-north-1.compute.internal
node/ip-192-168-68-212.eu-north-1.compute.internal

# choose the first one and label it for mccp database hosting
$ kubectl label node/ip-192-168-40-197.eu-north-1.compute.internal wkp-database-volume-node=true
```

This label will ensure that the MCCP pods will be deployed and run on the selected node, if the **SQLite** option has been chosen.

:::info
_MCCP also supports **PostgreSQL** or mounting SQLite on Persistent Volume instead of the host volume described here. See [Database Configuration](./database-configuration) for details._
:::

### 2. Creating a secret for docker repository

Create a secret that contains your docker repository credentials. This secret will be used by Kubernetes during deployment in order to pull down the MCCP images. You can find instructions on how to generate this secret [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

Add this secret to the target namespace. This needs to be the same namespace that the Helm chart will be installed.

```bash
$ kubectl apply -f docker-io-pull-secret.yaml --namespace mccp
```

Take note of the secret name as you will need to supply it later when installing the chart.

### 3. Determining the public IP address of the worker nodes

You need to determine the public IP address of the worker nodes of your cluster. This IP address is necessary in order to establish connectivity between agents and your MCCP instance. The way to determine this depends on your cluster type and provisioning method. Take note of that IP address as you will need to supply it later when installing the chart.

:::info
_You may also use a domain name instead of an IP address._
:::

### 4. Installing the Helm chart

Finally install the Helm chart to the target namespace by executing the following command using the Helm CLI (>= `v3.5.4`):

```bash
$ helm repo add wkpv3 https://s3.us-east-1.amazonaws.com/weaveworks-wkp/charts-v3
$ helm repo update
$ helm install mccp wkpv3/mccp --version <chart-version> --namespace mccp
    --set "imagePullSecrets[0].name=<secret-containing-docker-config>" \
    --set "agentTemplate.natsURL=<nats-address>:<exposed-port-for-nats>" \
    --set "nats.client.service.nodePort=<exposed-port-for-nats>" \
    --set "wkp-ui.image.pullSecrets[0]=<secret-containing-docker-config>"
```

Alternatively in a GitOps workflow, commit a `HelmRelease` manifest to your git repository that looks like this:

```yaml
apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: mccp
  namespace: mccp
spec:
  helmVersion: v3
  releaseName: mccp
  chart:
    name: mccp
    version: <chart-version>
    repository: https://s3.us-east-1.amazonaws.com/weaveworks-wkp/charts-v3
  values:
    imagePullSecrets:
    - name: <secret-containing-docker-config>
    agentTemplate:
      natsURL: <nats-address>:<exposed-port-for-nats>
    nats:
      client:
        service:
          nodePort: <exposed-port-for-nats>
    wkp-ui:
      image:
        pullSecrets:
          - <secret-containing-docker-config>
```

### 5. Checking that MCCP is installed (optional)

You should now be able to load the MCCP UI by running the following command:

```bash
$ kubectl port-forward --namespace mccp deployments.apps/mccp-nginx-ingress-controller 8000:80
```
The MCCP UI should now be accessible at `http://localhost:8000`.

## How to: Connect a cluster {#how-to-connect-a-cluster}

To connect a cluster to the multi-cluster control plane (MCCP), first navigate to the `Clusters` section of the WKP UI and click on the `Connect a cluster` button. You will then be presented with a form to add the details of the leaf cluster being connected.

- Name: this is the name of the leaf cluster. This is a required field.
- Ingress URL: this is the publicly accessible HTTP(S) endpoint of the leaf cluster. This is an optional field.

Click on the `Save & next` button to persist these details. You will then be presented with a `kubectl` command that you can run to install an agent on your leaf cluster. The agent is responsible for inspecting the leaf cluster and sending back leaf information to the MCCP server. It will not make any changes to your cluster.

Ensure that your current kubeconfig context is setup to use the leaf cluster. Then copy the command and run it.

After a few seconds, the status of your cluster should change to `Connected (Ready)` which indicates that the leaf cluster has been successfully connected.

## How to: Update a cluster

To update a cluster, click on the rightmost icon of that cluster's row. You will be presented with a form that allows you to update its name and ingress URL. Finally click on the `Save & next` button to persist these changes.

## How to: Disconnect and remove a cluster

To disconnect a cluster open the config dialog with the 🛠 button on the cluster's row.

The _Disconnect_ tab shows instructions on how to remove the wkp-agent from your leaf cluster.

Once the agent has been removed its status will change from "Connected" to _Last seen_. Click _Remove cluster from the MCCP_ to remove the cluster and the meta-data that's been collected.

To re-connect the cluster again follow the _Connect a cluster_ instructions above.

![Disconnect cluster](./img/disconnect-cluster.png)
