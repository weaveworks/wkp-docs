+++
title = "WKP Scope"
weight = 3
+++

## WKP Scope

WKP comes bundled with a couple of cluster components which can be useful tools in troubleshooting your cluster. One of them is Scope which you can access from the components listing on the cluster homepage in the UI:

![Scope's entry point](/troubleshooting/img/weave-scope-0.png)

Scope gives an real-time visual overview of all the components that make up your cluster in form of a graph representing their interactions.

![Scope UI](/troubleshooting/img/weave-scope-1.png)

It is a tool which can be used for a broad variety of purposes (see [Scope Feature Overview](https://www.weave.works/docs/scope/latest/features/)) and one of them is troubleshooting clusters.

In particular, you might be interested in checking pod logs which can be done through the UI:

1. Select Pods view as in the screenshot above
2. Use the search bar at the top and pod filters at the bottom of the screen to help pin down the pods of interest
3. Once found, click on a pod you want to inspect
4. Click on the _Get logs_ button in the pod's action bar
5. You should be seeing something similar to the screenshot below

![Pod logs](/troubleshooting/img/weave-scope-2.png)

If a pod is giving you trouble, you might want to reset it by clicking on the _Delete_ action.

Pod view is just one of the views available in Scope - you might want to become more familiar with your system by visually exploring your _Hosts_, _Containers_, etc...
