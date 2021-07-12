---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How to: Install MCCP using a Helm chart

Installing MCCP requires we:

1. Create a namespace
2. Choose a database
3. Create a secret for docker repository
4. Create a secret for creating pull requests on your git provider
5. Determine the public IP address of the worker nodes
6. Install the MCCP helm chart
7. Check that MCCP has been installed (optional)

### 1. Creating a namespace

Create a new namespace that will be used to run the MCCP components:

```bash
$ kubectl create namespace mccp
```

### 2. Choosing a database

MCCP stores incoming data from the connected clusters to a relational database. It supports **SQLite** and **PostgreSQL**. When using **SQLite** the database file may be stored on a host path volume or on a persistent volume. By default, MCCP will use **SQLite on a host path volume**.

:::info

Installing MCCP in its default configuration is ideal for trying it out but it is not recommended for production use. Using a SQLite database on a persistent volume or a cloud-hosted PostgreSQL database allows for increased reliability and scalability.

:::

<Tabs
  groupId="database-systems"
  defaultValue="sqlite-host-path-volume"
  values={[
    {label: 'SQLite on a host path volume', value: 'sqlite-host-path-volume'},
    {label: 'SQLite on a persistent volume', value: 'sqlite-persistent-volume'},
    {label: 'PostgreSQL', value: 'postgres'},
  ]}>
<TabItem value="sqlite-host-path-volume">

In this configuration, the database file is stored on one of the cluster worker nodes. In order for all the MCCP pods to be able to access the host volume, they must be placed on the same node. We can enforce this by applying a label to one of the cluster worker nodes:

```bash
# list all worker nodes
$ kubectl get node --selector='!node-role.kubernetes.io/master' -o name
node/ip-192-168-40-197.eu-north-1.compute.internal
node/ip-192-168-68-212.eu-north-1.compute.internal

# choose the first one and label it for mccp database hosting
$ kubectl label node/ip-192-168-40-197.eu-north-1.compute.internal wkp-database-volume-node=true
```

This label will ensure that the MCCP pods will be deployed and run on the selected node.

  </TabItem>
  <TabItem value="sqlite-persistent-volume">

If your cluster supports persistent volume storage and has a storage class defined, you can use it to request a persistent volume for the SQLite database file. The exact details of the persistent volume request vary by cluster type and the supported volume types. The following manifest is an example of a configuration of a `PersistentVolumeClaim`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mccp-volume
  namespace: mccp
spec:
  storageClassName: default
  resources:
    requests:
      storage: 100G
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
```

  </TabItem>
  <TabItem value="postgres">

Using a PostgreSQL database does not require any additional setup on the cluster side. The following details are however needed in order to connect:

- Database server hostname
- Database name
- Database user - The database user requires admin privileges on the database server as it will automatically create the necessary schema.
- Database password

The database credentials (user and password) need to be provided separately, before
installing the chart, as a secret. Run the following command to create a secret:

```bash
$ kubectl create secret generic mccp-db-credentials \
    --namespace mccp \
    --from-literal=username=<database-user> \
    --from-literal=password=<database-password>
```

  </TabItem>
</Tabs>

### 3. Creating a secret for docker repository

Create a secret that contains your docker repository credentials. This secret will be used by Kubernetes during deployment in order to pull down the MCCP images. You can find instructions on how to generate this secret [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

Add this secret to the target namespace. This needs to be the same namespace that the Helm chart will be installed.

```bash
$ kubectl create secret docker-registry \
  --namespace mccp docker-io-pull-secret \
  --docker-username=<your-docker-username> \
  --docker-password=<your-docker-password>
```

If you use a secrets management solution such as Sealed Secrets follow their instructions on how to create a new secret.

Take note of the secret name as you will need to supply it later when installing the chart.

### 4. Create a secret for creating pull requests on your git provider

A Personal Access Token is required for the MCCP to create pull requests for new clusters. These tokens need certain permissions (scopes) set. For

- GitHub: `repo`
- GitLab: `api`

Save the token in secret called `git-provider-credentials` in the mccp's deployment namespace:

```bash
kubectl create secret generic git-provider-credentials \
  --namespace=<mccp-namespace>
  --from-literal="GIT_PROVIDER_TOKEN=$GITHUB_TOKEN"
```

### 5. Determining the public IP address of the worker nodes

You need to determine the public IP address of the worker nodes of your cluster. This IP address is necessary in order to establish connectivity between agents and your MCCP instance. The way to determine this depends on your cluster type and provisioning method. Take note of that IP address as you will need to supply it later when installing the chart.

:::info
_You may also use a domain name instead of an IP address._
:::

### 6. Installing the Helm chart

Before installing the chart, you need to add the Helm chart repository and then update its local cache. Run the following commands:

```bash
$ helm repo add wkpv3 https://s3.us-east-1.amazonaws.com/weaveworks-wkp/charts-v3
  "wkpv3" has been added to your repositories
$ helm repo update
  Hang tight while we grab the latest from your chart repositories...
  ...Successfully got an update from the "wkpv3" chart repository
  Update Complete. ⎈Happy Helming!⎈
```

Finally install the Helm chart to the target namespace by executing the following command using the Helm CLI (>= `v3.5.4`).

<Tabs
  groupId="database-systems"
  defaultValue="sqlite-host-path-volume"
  values={[
    {label: 'SQLite on a host path volume', value: 'sqlite-host-path-volume'},
    {label: 'SQLite on a persistent volume', value: 'sqlite-persistent-volume'},
    {label: 'PostgreSQL', value: 'postgres'},
  ]}>
<TabItem value="sqlite-host-path-volume">

```bash
$ helm install mccp wkpv3/mccp \
    --version <chart-version> \
    --namespace mccp \
    --set "imagePullSecrets[0].name=<secret-containing-docker-config>" \
    --set "agentTemplate.natsURL=<nats-address>:<exposed-port-for-nats>" \
    --set "nats.client.service.nodePort=<exposed-port-for-nats>" \
    --set "wkp-ui.image.pullSecrets[0]=<secret-containing-docker-config>" \
    --set "config.capi.repositoryURL=https://github.com/example/management-repo" \
    --set "config.capi.baseBranch=main"
```

  </TabItem>
  <TabItem value="sqlite-persistent-volume">

```bash
$ helm install mccp wkpv3/mccp \
    --version <chart-version> \
    --namespace mccp \
    --set "imagePullSecrets[0].name=<secret-containing-docker-config>" \
    --set "dbConfig.databaseType=sqlite" \
    --set "sqliteConfig.persistentVolumeClaim=true" \
    --set "agentTemplate.natsURL=<nats-address>:<exposed-port-for-nats>" \
    --set "nats.client.service.nodePort=<exposed-port-for-nats>" \
    --set "wkp-ui.image.pullSecrets[0]=<secret-containing-docker-config>"
    --set "config.capi.repositoryURL=https://github.com/example/management-repo" \
    --set "config.capi.baseBranch=main"
```

  </TabItem>
  <TabItem value="postgres">

```bash
$ helm install mccp wkpv3/mccp \
    --version <chart-version> \
    --namespace mccp \
    --set "imagePullSecrets[0].name=<secret-containing-docker-config>" \
    --set "dbConfig.databaseType=postgres" \
    --set "dbConfig.databaseURI=<database-server-hostname>" \
    --set "postgresConfig.databaseName=<database-name>" \
    --set "agentTemplate.natsURL=<nats-address>:<exposed-port-for-nats>" \
    --set "nats.client.service.nodePort=<exposed-port-for-nats>" \
    --set "wkp-ui.image.pullSecrets[0]=<secret-containing-docker-config>"
    --set "config.capi.repositoryURL=https://github.com/example/management-repo" \
    --set "config.capi.baseBranch=main"
```

By default, connections to PostgreSQL will use port 5432.

  </TabItem>
</Tabs>

### 7. Checking that MCCP is installed (optional)

You should now be able to load the MCCP UI by running the following command:

```bash
$ kubectl port-forward --namespace mccp deployments.apps/mccp-nginx-ingress-controller 8000:80
```

The MCCP UI should now be accessible at `http://localhost:8000`.

## How to: Install the MCCP CLI

The MCCP CLI allows you to interact with MCCP clusters. You can use `mccp` to manage the lifecycle of your infrastructure declaratively using GitOps. The latest version of the MCCP CLI is available in the following links:
 - [Linux](https://weaveworks-wkp.s3.amazonaws.com/mccp-master-linux-amd64)
 - [macOS](https://weaveworks-wkp.s3.amazonaws.com/mccp-master-darwin-amd64)