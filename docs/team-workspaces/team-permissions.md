+++
title = "Team permissions"
weight = 15
+++


## Team Permissions

Workspaces may require different permission levels for their members. Permissions granted
for each workspace are set by the role in the Workspace custom resource.
WKP provides 3 levels by default:

- `workspace-member`
- `namespace-admin`
- `cluster-admin`

but it can support any custom `ClusterRole` the cluster admin has created in the cluster.

In more detail the permissions of each role:

### workspace-member

This role is applicable to dev teams as members of the workspace are able to perform all
operations in the provided namespaces, but do not have permissions to modify tenant
policies that may be created, such as resource quotas, limit ranges, and network policies.

The `workspace-member` role manifest is added in the cluster repository in the
`cluster/platform/workspaces` directory and is reconciled by the flux instance in the
`wkp-flux` namespace, allowing for modification based on your requirements.

### namespace-admin

This role grants namespace admin permissions to the namespaces that are in the workspace.
Members are able to modify all objects and resource in the namespace, making it more
relevant for teams in clusters without strict resource restrictions.

### cluster-admin

This role grants cluster admin permission to the entire cluster. It is applicable to
infrastructure teams that may require to create namespaces, or deploy non namespaced objects, like custom resource definitions.

## How to: Allow teams with `workspace-member` access to create non-namespaced objects

Members of a workspace may need to create non-namespaced objects, but it may not
be possible to grant the team cluster-admin permissions.
This use case can be addressed by binding multiple `ClusterRoles` to the service account
of the specific workspace.

An example of a `ClusterRole` and `ClusterRoleBinding` that grant permissions
to create `Custom Resource Definitions`, are provided in the
`cluster/platform/workspaces` directory. See:

- `cluster/platform/workspaces/crd-manager-clusterrole.yaml`
- `cluster/platform/workspaces/crd-manager-clusterrolebinding.yaml`

To apply it to a workspace, create a copy of the `ClusterRoleBinding` file and
set the name of the placeholder of the service account to the name of the target workspace, and
push the file to the cluster repository.
After the reconciliation loop is completed, member permissions are updated and they should be able to create CRDs,
without any further action from them.

## Git commit statuses

A workspace repository shows updates about the reconciliation of the manifests in the git commit 
status.
This functionality leverages the [Gitops Toolkit](https://toolkit.fluxcd.io/guides/notifications/#git-commit-status)
notifications.
To set up, an `Alert` and `Provider` object are created in the `wkp-workspaces` namespace during 
workspace creation.

If there has been an error in the reconciliation, the status message shows an error and a
message with the relevant logs. Alternatively, the status of the reconciliation can be retrieved by
the `Kustomization` object of the workspace.

The object has the name of the workspace and is created in the wkp-workspaces namespace.

Please refer workspace members to the `Debugging manifest reconciliation` section of the member
guide, for debugging information and steps on the reconciliation of committed manifests.

## More Information

For more information on how Role Based Access Control works in WKP, please
refer to the kubernetes documentation at:
https://kubernetes.io/docs/reference/access-authn-authz/rbac/