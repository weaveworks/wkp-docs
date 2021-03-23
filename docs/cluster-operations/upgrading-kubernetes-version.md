+++
title = "Upgrading Kubernetes version"
weight = 3
+++

### Upgrading Kubernetes on WKS-track Clusters

*NOTE: Upgrading from the CLI only works for clusters created on WKS tracks (Footloose and SSH Nodes), to upgrade for EKS track log in as an admin to EKS and upgrade from the UI.*

The version of Kubernetes used by `{{<param "clicmd" >}}` is
controlled by a value specified in the `config.yaml` file deployed by
the `{{<param "clicmd" >}} setup install` command. For WKS tracks
(wks-ssh, wks-footloose), the value is
`wksConfig.kubernetesVersion`.

Upgrades may only be done to the next minor version of Kubernetes or
a larger micro version if using the same minor version. For example,
if you're currently running Kubernetes version 1.16.11, you may only
upgrade to a Kubernetes version 1.16.x where x > 11, or to version
1.17.x. If you wish to upgrade Kubernetes from version 1.16.x to
1.18.x, you must first upgrade to 1.17.x and from 1.17.x you may
upgrade to 1.18.x.

```yaml
wksConfig:
  # Defines the version of Kubernetes installed on each node.
  # Must be: `'1.16.x'`-`'1.20.x'`
  # friendly reminder to use quotes to ensure this value is a YAML string.
  # [REQUIRED]
  kubernetesVersion: '1.20.0'
```

To upgrade Kubernetes to a later version for Footloose and SSH Nodes clusters, simply update the `config.yaml` file with the new version and run:

```bash
`{{<param "clicmd" >}} upgrade --config-file <path to config.yaml>`
```

If you have a non-critical cluster with only two control plane nodes, you can still upgrade by passing the `--allow-reduced-availability-during-upgrade` flag:

```bash
`{{<param "clicmd" >}} upgrade --config-file <path to config.yaml> --allow-reduced-availability-during-upgrade`
```

#### Verify that existing application component versions aren't removed

New versions of Kubernetes sometimes remove and replace apiVersions.
For example, deployments in the Kubernetes 1.16 and later releases
must use **apps/v1** rather than the removed **extention/v1beta1**,
**apps/v1beta1**, and **apps/v1beta2** versions supported prior to 1.16.

If you have such an object that is subject to removal, you should
update the manifest(s) for the application and replace the older
versions with the currently accepted version.  You will then need to
redeploy the application using the updated manifest prior to upgrading.

**Failing to do so might cause existing applications to no longer work
or to be removed from the cluster**
