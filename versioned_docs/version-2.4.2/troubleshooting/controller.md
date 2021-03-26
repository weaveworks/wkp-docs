---
title: "Troubleshooting wks-controller"
---


`wks-controller` is responsible for the upgrade process and if it's not running not a lot will happen.

### Check that `wks-controller` is running correctly

```console
$ kubectl get pods --namespace weavek8sops
NAME                              READY   STATUS    RESTARTS   AGE
capi-controller-7b8c44f84c-f48h6  1/1     Running   0          3d6h
wks-controller-6c98fd95d8-d5bqw   1/1     Running   0          3d6h
```

If it is not running some things to check:

- Flux might have a configuration error and fail to sync all yaml manifests from the git repo.
- The cluster is having trouble scheduling pods.

### Check `wks-controller` logs

Check the logs for errors that might suggest a path towards resolving the upgrade.

```bash
kubectl logs --namespace weavek8sops deployment/wks-controller
```

### Restart the `wks-controller` pod

Restarting the pod may get things moving if something strange has happened.

```bash
kubectl delete pod --namespace weavek8sops wks-controller-6c98fd95d8-d5bqw
```

Wait and see if the node status changes, then check the logs again.
