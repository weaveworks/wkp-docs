+++
title = "Team Workspaces"
alwaysopen = true
weight = 30
+++

## Team Workspaces

A workspace is a GitOps repository tied to one or more namespaces in a WKP cluster and a set of Kubernetes controllers that are keeping them in sync. All Kubernetes objects created in the workspace repository are applied to the specified namespace(s) by the controllers. One can create a workspace by adding a Workspace custom resource manifest in the cluster repository.
