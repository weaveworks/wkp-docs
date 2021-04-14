---
title: "Debugging a Problem"
---

If you are experiencing problems with your cluster, one of the following guides might help you fix the issue:

1. Check the [known issues for your version of WKP ](/getting-started/known-issues.md)
2. Make sure your [kubelet is running correctly](kubelet.md)
3. Run `kubectl get pods --all` to check all your pods and get the logs for troublesome pods like [here](controller.md)
4. Keep an eye on the [Prometheus Alerts](/monitoring/alerts.md) and [Grafana Dashboards](/monitoring/dashboards.md) in the WKP UI
5. Use [WKP Scope](scope.md) to inspect your cluster from a high level
