+++
title = "Alerts"
+++

## Alerts

### View active alert definitions

Prometheus shows the currently loaded alert definitions. Open WKP UI in your browser and:

{{< columns >}}

1. Click the _Prometheus_ button in the list of cluster components
![Prometheus button](/monitoring/img/prom-button.png)

<--->

2. Click _Alerts_ in the Prometheus navigation bar
![Prometheus ui](/monitoring/img/prom-ui.png)

<--->

3. The list of loaded alert defintions is displayed
![Prometheus alerts ui](/monitoring/img/prom-ui-alerts.png)

{{< /columns >}}

### Adding new alerts

Some example alerts are included in the `cluster/manifests` folder of your config repo. To create a new alert:

1. Open the `example-alerts.yaml` file in `cluster/manifests`
1. Uncomment the contents of the file.
1. Modify and add new alert definitions to the file. (See [additional resources]({{< ref "#additional-resources" >}}) for more detailed information about Alertmanager's alert format and options.)
1. `git commit` and `git push` the changes to your config repoistory.

Flux will detect the change and add the new alerts into the cluster. Check that the new alert has been loaded by following [view active alert definitions]({{< ref "#view-active-alert-definitions" >}}) above.

### Additional resources

- [The prometheus alerting rule documentation](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) describes alert definitions and their options in more detail.
- [The prometheus operator alerting documentation](https://github.com/coreos/prometheus-operator/blob/master/Documentation/user-guides/alerting.md) describes the `PrometheusRule` CRD that we use to load the alert definitions.

### Example alert

Here is one of the example alerts that will fire continuously, helping you check everything is working.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  creationTimestamp: null
  labels:
    prometheus: example
    role: alert-rules
  name: prometheus-example-rules
spec:
  groups:
  - name: ./example.rules
    rules:
    # This alert will always fire and is good to quickly test that things are working.
    - alert: ExampleAlert
      expr: vector(1)
```
