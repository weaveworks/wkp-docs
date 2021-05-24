---
title: "Usage guide"
---

## How to: Install MCCP via a helm chart

Installing the MCCP requires we:

1. Choose and configure the database in `values.yaml`
2. Enable the `fleetManagement` feature in `values.yaml`
3. Create a secret for docker repository
4. Determine your host IP address
5. Install the MCCP helm chart

### 1. Choosing a database

The default MCCP database configuration will use **SQLite** on a _Host Volume_. For all the MCCP pods to be able to access this host volume they must be on the same node. We can do this by applying a label to one of the cluster worker nodes:

``` console
# list all worker nodes
$ kubectl get node --selector='!node-role.kubernetes.io/master' -o name
node/ip-192-168-40-197.eu-north-1.compute.internal
node/ip-192-168-68-212.eu-north-1.compute.internal

# choose the first one and label it for mccp database hosting
$ kubectl label node/ip-192-168-40-197.eu-north-1.compute.internal wkp-database-volume-node=true
```

Now you can install the MCCP.

:::info
_The MCCP also supports **PostgreSQL** or mounting SQLite on Persistent Volume instead of the host volume described here. See [Database Configuration](./database-configuration) for details._
:::

### 2. Enable the MCCP in values.yaml

To install  MCCP edit the `values.yaml` file, set the `featureGates: fleetManagement`
field to `true`.

### 3. Create a secret for docker repository

Create a secret that contains your docker repository credentials that will be used to pull down the images. You can find instructions on how to generate this secret [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

Add this secret to the target namespace. This needs to be the same namespace that the Helm chart will be installed.

```bash
> kubectl apply -f docker-io-pull-secret.yaml --namespace mccp
```

Take note of the secret name as you will need to supply it later when installing the chart.

### 4. Get host IP address

Determine your host IP address. If you are on wifi run this command:

```bash
> ipconfig getifaddr en0
> 192.168.0.1
```

Take note of the IP address as you will need to supply it later when installing the chart. This is necessary in order to establish connectivity between agents and your MCCP instance.

### 5. Install the helm chart

Finally install the Helm chart to the target namespace by creating a `kind: HelmRelease` file that looks like this:

```yaml
apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: wkp-ui
  namespace: wkp-ui
spec:
  releaseName: wkp-ui
  chart:
    name: wkp-ui
    version: {{chart.version}}
    repository: "https://s3.us-east-1.amazonaws.com/weaveworks-wkp/charts/"
  forceUpgrade: true
  values:
    image:
      pullSecrets:
        - docker-io-pull-secret
    ingress:
      enabled: true
      annotations:
        kubernetes.io/ingress.class: 'wkp-nginx'
        {{#if authSecret}}
        nginx.ingress.kubernetes.io/auth-type: basic
        nginx.ingress.kubernetes.io/auth-secret: auth-secret
        {{/if}}
        nginx.ingress.kubernetes.io/rewrite-target: /$1
      hosts: ['']
      path: '{{endpoints.ui}}?(.*)'
    config:
      demoMode: {{chart.values.config.demoMode}}
      featureGates:
        teamWorkspaces: {{chart.values.config.featureGates.teamWorkspaces}}
        fleetManagement: {{chart.values.config.featureGates.fleetManagement}}
      gitRepo:
        provider: {{ git.provider }}
        url: {{ git.url }}
        branch: {{ git.branch }}
      datasources:
        alertmanager: /alertmanager/api/v1
        prometheus: /prometheus/api/v1
      drilldownLinksById:
        cluster_resources:
          url: /grafana/d/all-nodes-resources/kubernetes-all-nodes-resources
        node_resources:
          url: /grafana/d/single-node-resources/kubernetes-single-node-resources
        alertmanager_dashboard:
          url: /alertmanager/#/alerts
      resourcesById:
        node_cpu_utilisation:
          query: label_replace(instance:node_cpu_utilisation:rate1m, "node", "$1", "instance", "(.*)")
        node_memory_utilisation:
          query: label_replace(instance:node_memory_utilisation:ratio, "node", "$1", "instance", "(.*)")
        node_pods_count:
          query: kubelet_running_pods or kubelet_running_pod_count
      clusterInfo:
        name: {{chart.values.config.clusterInfo.name}}
        provider: {{chart.values.config.clusterInfo.provider}}
        regions: {{chart.values.config.clusterInfo.regions}}
        track: {{chart.values.config.clusterInfo.track}}
        managementClusterLink: {{chart.values.config.clusterInfo.managementClusterLink}}
      homepage:
        clusterComponents:
          configMap:
            name: wkp-ui-cluster-components-config
            key: components.json
```

### 6. Check MCCP is installed

You should now be able to load the MCCP UI by running the following command:

```bash
> kubectl port-forward --namespace mccp deployments.apps/mccp-nginx-ingress-controller 8000:80
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
