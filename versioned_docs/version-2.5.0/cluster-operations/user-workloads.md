---
title: "Running and Managing Workloads"
---

### Running user workloads

Once your cluster is up and running it's time to put it work!

### Managing workloads with GitOps

WKP encourages using GitOps to manage your workloads. We can specify the state of the cluster including all our user workloads in the config git repository. The _WKP Flux_ Cluster Component will ensure that the git repository and the cluster then stay in sync. This gives us a number of benefits including

- An audit trail of who deployed or updated a workload and why
- Deployment rollbacks via `git revert`

Additionally WKP clusters support all the traditional ways of creating and deploying workloads through `kubectl` and the api-server directly. Check out the [Kubernetes docs](https://kubernetes.io/docs/tasks/) to familiarize yourself with these tools.

### Adding a workload

By default the `./cluster/manifests` path within the config repository is reserved for user manifests. Any `.yaml` Kubernetes manifest you add within this path will be deployed to the cluster automatically.

#### Example: Adding nginx

Lets create a new file: `./cluster/manifests/nginx.yaml` and set the contents:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

Save the file, then we'll commit and push it to the repository host

```bash
git add ./cluster/manifests/nginx.yaml
git commit -m "Deploying nginx to the cluster"
git push origin master
```

### Checking a workload is deployed

Once we have pushed we can check the workload is deployed in the cluster like with `kubectl`:

```bash
kubectl get pods

NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-574b87c764-mth9r   1/1     Running   0          16s
```

There is a new pod running!

### View the new workload in Weave Scope

We can use the Weave Scope Cluster Component to view all the workloads running on the cluster. First open the WKP ui

```console
wk ui
```

Then when the browser opens click the "Open Scope" button in the Cluster Components list. You can use Scope to explore whats running on your cluster.

![Nginx in Scope](/getting-started/img/scope-nginx-detail.png)

### View the UI

We can view the Web UI of a pod by forwarding the http ports it listens on

```console
kubectl port-forward deployment/nginx-deployment 8080:80
```

opening [http://localhost:8080](http://localhost:8080) in your browser will show the default nginx server response

### Check logs

We can check the logs of our new pod via kubectl

```console
kubectl logs deployment/nginx-deployment

127.0.0.1 - - [05/Jun/2020:10:15:26 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15" "-"
127.0.0.1 - - [05/Jun/2020:10:15:26 +0000] "GET /favicon.ico HTTP/1.1" 404 169 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15" "-"
2020/06/05 10:15:26 [error] 6#6: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 127.0.0.1, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "localhost:8080", referrer: "http://localhost:8080/"
```

displaying the requests we just made.

### Updating a workload

A common operation is upgrading a version of a workload when there is a new release. To do that we can edit the `.yaml` file and change the docker image to the desired tag:

```console
vim cluster/manifests/nginx.yaml
git diff
```

```diff
diff --git a/cluster/manifests/nginx.yaml b/cluster/manifests/nginx.yaml
index 91f07bf..198b404 100644
--- a/cluster/manifests/nginx.yaml
+++ b/cluster/manifests/nginx.yaml
@@ -14,7 +14,7 @@ spec:
     spec:
       containers:
       - name: nginx
-        image: nginx:1.14.2
+        image: nginx:1.16.1
         ports:
         - containerPort: 80
```

Then once again we can commit and push to update the cluster:

```console
git add ./cluster/manifests/nginx.yaml
git commit -m "Update nginx to 1.16.1"
git push origin master
```

### Debugging

If a change to the git repository does not seem to be reflected in the cluster we can take some steps to investigate

### Verify the `flux-sync` git tag

When flux applies a commit it will update a git tag on the repository. If you don't have access to the flux pod's logs this is a handy way of checking what was last sync'd:

```console
$ git pull
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), 148 bytes | 148.00 KiB/s, done.
From gitlab.dev.wkp.weave.works:foot/simon-gcp-59
 * [new tag]         flux-sync  -> flux-sync
Already up to date.
```

We can inspect the tag and see when flux last updated it and which commit was last applied.

```console
git show flux-sync -q
tag flux-sync
Tagger: Weave Flux <support@weave.works>
Date:   Fri Jun 5 10:12:29 2020 +0000

Sync pointer

commit d81af6571f525d924e896a5fbcd0706abd09a7ee (HEAD -> master, tag: flux-sync, origin/master)
Author: WKP Support <support@weave.works>
Date:   Fri Jun 5 12:12:17 2020 +0200

    Deploying nginx to the cluster
```

Flux is configured by default to poll and apply the git repository every 10s. If after waiting this long the tag has not updated flux might be having trouble syncing the repository. To learn more we need to check its logs.

### Check the flux logs for errors

We can inspect the flux logs with:

```console
kubectl logs -n wkp-flux deployment/flux
```

Flux will report any errors raised while it was applying the yaml manifests. This can include things like:

- Unable to read the git repository if there are connectivity issues.
- Syntax errors in the `.yaml` manifest files
- Kubernetes validation errors if the manifest files are badly formed.

Correct any errors in your yaml files and then try commiting and pushing your changes again.

### Remove a workload

Removing a workload is again a simple operation on the config repository:

```console
git rm ./cluster/manifests/nginx.yaml
git commit -m "Removing nginx for now"
git push origin master
```

Flux will sync and remove the workload from the cluster.
