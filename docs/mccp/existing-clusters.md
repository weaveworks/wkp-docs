---
title: Existing clusters
---

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
