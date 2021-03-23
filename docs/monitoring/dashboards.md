+++
title = "Dashboards"
+++

## Dashboards

### View active dashboards

Open WKP UI in your browser and:

{{< columns >}}

1. Click the _Grafana_ button in the list of cluster components
![Promtheus button](/monitoring/img/grafana-button.png)

<--->

2. Click _Home_ in the Grafana top navigation bar
![Promtheus ui](/monitoring/img/grafana-ui.png)

<--->

3. The list of loaded dashboards is displayed
![Promtheus alerts ui](/monitoring/img/grafana-ui-dashboards.png)

{{< /columns >}}


Grafana dashboards are stored in `./cluster/platform/grafana-dashboards`.

```
cluster/platform/grafana-dashboards/
├── k8s-all-node-resources.json
├── k8s-pod-resources.json
├── k8s-service-resources.json
├── k8s-single-node-resources.json
└── k8s-system-services.json
```


### Adding new dashboards

To add additional grafana dashboards you can create and export them in the Grafana UI or download them from Grafana website.

#### From JSON source

Once you have the JSON data for a dashboard we commit it to our git config repository and it will be loaded into Grafana. Dashboards must be saved into `cluster/platform/grafana-dashboards/`. For example:

1. `git add cluster/platform/grafana-dashboards/my-new-dashboard.json`
1. `git commit -m "Adds my new dashboard"`
1. `git push`
1. Flux will load the dashboard into Grafana where you can see it by following the _View active dashboards_ steps above.

#### Downloading new dashboards from Grafana's website

Grafana maintains a collection of shared dashboards at https://grafana.com/grafana/dashboards. You can download and use these in our cluster.

1. Find a dashboard you like on https://grafana.com/grafana/dashboards
1. Click the _Download JSON_ link from the sidebar on the dashboard details page.
1. Follow the _From JSON source_ instructions above.

#### Creating your own dashboards

To to create your own dashboard from scratch

1. In Grafana Click `+` on the left navigation menu to _Create Dashboard_.
1. Click _Add panel_ and customize the panel with Prometheus and other queries.
1. Continue adding panels until you've got a dashboard you're happy with. See the [Grafana dashboard documentation](https://grafana.com/docs/grafana/latest/features/dashboard/dashboards/) for details and options.
1. Click _Dashboard settings_ > _JSON Model_ to access the JSON data.
1. Follow the _From JSON source_ instructions above.
