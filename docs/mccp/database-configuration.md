---
title: "Configuring a Database"
---

### Supported databases

The Multi-cluster Control Plane (MCCP) component stores incoming data from the connected clusters in a database. It
supports sqlite and postgres databases. To configure the type of database, modify the
`config.yaml` file at your cluster directory:

```yaml
# Storage configuration for the fleet management database
# Supported databases: `sqlite`, `postgres`
fleetManagementDB:
  databaseType: sqlite
  databaseURI: '/var/database/mccp.db'
  # Applies only if databaseType = sqlite
  sqliteConfig:
    hostPathVolume: true
    # Path on the filesystem of the underlying kubernetes node
    path: '/home/wks/database'
    persistentVolumeClaim: false
  # Applies only if databaseType = postgres
  # To provide a user and password, refer to our user-guide at
  # the MCCP Database Configuration page. Run `wk user-guide`.
  postgresConfig:
    databaseName: postgres
```

The database defaults to sqlite which will be stored as a file in a persistent volume in the cluster. When opting for a postgres database, credentials can be provided before
enabling the `fleetManagement` feature in `config.yaml`.

### Providing database credentials

If you are opt for a postgres database, credentials for your user can be provided by
generating a sealed secret in the following way:

```bash
kubectl create secret generic -n wkp-mccp mccp-db-credentials --from-literal=username=... --from-literal=password=... -oyaml --dry-run | kubeseal --cert setup/sealed-secrets-cert.crt -oyaml > mccp-db-credentials-wkp-mccp.yaml
kubectl create secret generic -n wkp-gitops-repo-broker mccp-db-credentials --from-literal=username=... --from-literal=password=... -oyaml --dry-run | kubeseal --cert setup/sealed-secrets-cert.crt -oyaml > mccp-db-credentials-wkp-gitops-repo-broker.yaml
```

Then copy the generated file into your `cluster/manifests` directory, create a git commit and push.
After a few seconds the secret should be created in your cluster. Verify the status of the pods in
`wkp-gitops-repo-broker`:

```bash
kubectl get pods -n wkp-gitops-repo-broker
```

and the logs of the `event-writer` pod to assert that it was able to connect to the database:

```bash
kubectl logs -n wkp-gitops-repo-broker -l=app=event-writer
```

### Setting a storage class for SQLite

If your cluster supports persistent volume storage and has a storage class defined, it is possible to
set it for the MCCP SQLite database, as by default it will use a `hostPath` volume, which is
not suitable for production.

To set the storage class, configure the following in your `config.yaml`:

```yaml
# Storage configuration for the fleet management database
# Supported databases: `sqlite`, `postgres`
fleetManagementDB:
  databaseType: 'sqlite'
  databaseURI: '/var/database/mccp.db'
  # Applies only if databaseType = sqlite
  sqliteConfig:
    hostPathVolume: false
    path: '/home/wks/database'
    persistentVolumeClaim: true
```

Then, uncomment the sample persistent volume claim manifest `pvc-wkp-gitops-repo-broker.yaml` and
modify it according to your storage class and size requirements, finally git commit and push.
