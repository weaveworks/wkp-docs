+++
title = "Troubleshooting"
alwaysopen = true
weight = 70
+++

## Troubleshooting

If you are experiencing problems with your cluster, one of the following guides might help you fix the issue:

1. Check the [known issues for version WKP {{<param "version" >}}](/getting-started/known-issues)
2. Make sure your [kubelet is running correctly](kubelet)
3. Run `kubectl get pods --all` to check all your pods and get the logs for troublesome pods like [here](controller)
4. Keep an eye on the [Prometheus Alerts]({{< ref "/monitoring/alerts.md" >}}) and [Grafana Dashboards]({{< ref "/monitoring/dashboards.md" >}}) in the WKP UI
5. Use [WKP Scope](scope) to inspect your cluster from a high level
