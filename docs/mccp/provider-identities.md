---
title: CAPI Provider Identities
---

## Multi-tenancy

Some Cluster API providers allow you to choose the account or identity that the new cluster will be created with. This is often referred to as _Multi-tenancy_ in the CAPI world. MCCP currently supports:

- [**AWS** multi-tenancy](https://cluster-api-aws.sigs.k8s.io/topics/multitenancy.html)
- [**Azure** multi-tenancy](https://capz.sigs.k8s.io/topics/multitenancy.html)
- [**vSphere** multi-tenancy](https://github.com/kubernetes-sigs/cluster-api-provider-vsphere/blob/master/docs/identity_management.md)

### Identities and templates

Our _templates_ describe the properties of the cluster, how many nodes, what version of Kubernetes etc, while the _identity_ is which account will be used to create the cluster. So given in our cluster we have the template:

```yaml
apiVersion: capi.weave.works/v1alpha1
kind: CAPITemplate
metadata:
  name: capa-cluster-template
spec:
  resourcetemplates:
    - apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4
      kind: AWSCluster
      metadata:
        name: '${CLUSTER_NAME}'
      spec:
        region: '${AWS_REGION}'
```

and the identity

```yaml
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha3
kind: AWSClusterStaticIdentity
metadata:
  name: 'test-account'
spec:
  secretRef:
    name: test-account-creds
    namespace: capa-system
  allowedNamespaces:
    selector:
      matchLabels:
        cluster.x-k8s.io/ns: 'testlabel'
```

We can select ask the MCCP to use the `test-account` when creating the cluster by using the _Infrastructure provider credentials_ dropdown on the _Create new cluster with template_ page:

![Identity Selection](./img/identity-selection.png)

The resulting definition will have the identity injected into the appropriate place in the template, for this example:

```yaml
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4
kind: AWSCluster
metadata:
  name: example-cluster
spec:
  region: eu-north-1
  identityRef:
    kind: AWSClusterStaticIdentity
    name: test-account
```

### `identityRef`s

The supported providers implement multi-tenancy by setting an `identityRef` on the the provider cluster object, e.g. `AWSCluster`, `AzureCluster` or `VSphereCluster`.

The MCCP will search _all namespaces_ in the cluster for potential identities that can be used to create a cluster. The following identity `kind`s are currently supported and their corresponding Cluster kinds:

- `AWSClusterStaticIdentity`: `AWSCluster`
- `AWSClusterRoleIdentity`: `AWSCluster`
- `AzureClusterIdentity`: `AzureCluster`
- `VSphereClusterIdentity`: `VSphereCluster`
