+++
title = "Securing the UI"
weight = 3
+++

## Securing the UI

Before exposing the WKP UI publicly, you need to setup a way to authenticate your users as well as provision SSL certificates for the HTTPS endpoints. You also need an ingress controller that can handle ingress requests deployed either as a `LoadBalancer` or `NodePort` service.

Here is an overview of the steps necessary to expose and secure your cluster
- Install an [ingress controller]({{< ref "#ingress-controller" >}} "Ingress Controller") to expose internal services outside the cluster
- Add [TLS/HTTPS]({{< ref "#ssl-certificates" >}}) to access this securely 
- Deploy and configure oauth2-proxy to [allow]({{< ref "#authentication" >}}) only members of your organization to access the UI
- [Expose]({{< ref "#expose" >}}) the internal WKP UI service publicly through an ingress and keep it secure by redirecting any unauthenticated users to GitHub or GitLab through the use of NGINX annotations

### Ingress Controller {#ingress-controller}

If you already have an ingress controller running on your WKP cluster, feel free to skip to the next section. Otherwise, use the following manifest to install the NGINX ingress controller as a `NodePort` service.

```
---
apiVersion: v1
kind: Namespace
metadata:
  name: ingress-nginx
---
apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
spec:
  helmVersion: v3
  releaseName: nginx-ingress-controller
  chart:
    name: nginx-ingress-controller
    version: 7.4.6
    repository: https://charts.bitnami.com/bitnami
  values:
    service:
      type: NodePort
```

You should now have an NGINX ingress controller running on your cluster as a `NodePort` service. To find out which ports are being exposed, use the following command:

```
kubectl get services -n ingress-nginx nginx-ingress-controller
```

You can validate that the ingress controller is externally accessible via your configured DNS name by testing it with curl:

```
curl http://example.org:<port>
```

### SSL Certificates {#ssl-certificates}

The recommended way to provision SSL certificates in Kubernetes is through [cert-manager](https://cert-manager.io/). Use the following manifests to install cert-manager on your WKP cluster.

```
---
apiVersion: v1
kind: Namespace
metadata:
  name: cert-manager
---
apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: cert-manager
  namespace: cert-manager
spec:
  releaseName: cert-manager
  chart:
    name: cert-manager
    version: v1.2.0
    repository: https://charts.jetstack.io
  values:
    installCRDs: true
```

At this point, you should have cert-manager running in the `cert-manager` namespace. To continue, you need to create `Issuer` or `ClusterIssuer` resources. These represent certificate authorities that can generate signed certificates. An `Issuer` is a namespaced resource, used to issue certificates in its current namespace. A `ClusterIssuer` is not namespaced and can be used to issue certificates across all namespaces. 

For example, the following manifest creates a cluster-wide issuer that uses Let's Encrypt to issue certificates and is configured to use an [HTTP01](https://cert-manager.io/docs/configuration/acme/http01/) challenge. The ingress class is used to indicate which ingress controller will be used to expose a well known endpoint for the purpose of solving the validation challenge.  

```
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: <your-email>
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
    - http01:
        ingress:
          class: nginx
```

An issuer that uses the HTTP01 challenge solver is useful when there is already a DNS name setup for the UI and the ingress controller is exposing HTTP/S in ports 80/443 (as is the case when it has been deployed as a `LoadBalancer` service). When the ingress controller is deployed as a `NodePort` service (as mentioned above), the DNS01 challenge can be used instead. The following manifest shows how to create a `ClusterIssuer` that is configured to use the DNS01 challenge. In this example, the issuer references a key and a secret which holds the credentials for an IAM user with permissions to update the AWS Route53 DNS service. Other DNS providers can also be configured accordingly.

```
--
apiVersion: v1
data:
  secret-access-key: <base64-encoded-secret-access-key>
kind: Secret
metadata:
  creationTimestamp: null
  name: route53-credentials
  namespace: cert-manager
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: <your-email>
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
    - dns01:
        route53:
          region: eu-west-1
          accessKeyID: <access-key-with-route53-permissions>
          secretAccessKeySecretRef:
            name: route53-credentials
            key: secret-access-key
```

Of course, you can also supply your own CA certificates and use them to issue new certificates. This can be useful in air gapped environments where it's not practical to use an ACME provider such as Let's Encrypt. The following manifest shows an example of that.

```
---
apiVersion: v1
kind: Secret
metadata:
  name: ca-key-pair
  namespace: cert-manager
data:
  tls.crt: <your-tls-cert>
  tls.key: <your-tls-key>
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ca-issuer
spec:
  ca:
    secretName: ca-key-pair
```

Cert-manager should now be ready and configured to issue certificates for ingress resources that include the annotation: `cert-manager.io/cluster-issuer: <name-of-your-cluster-issuer>` (or `cert-manager.io/issuer: <name-of-your-issuer>` for namespaced issuers).

### Authentication {#authentication}

To set up authentication, you need to install [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) which acts as a reverse proxy for the endpoints you need to secure and can authenticate users using a variety of auth providers such as GitHub or GitLab.  Before configuring oauth2-proxy, you need to create an OAuth2 application in your preferred authentication provider. The sections below describe how to set this up for GitHub or GitLab.

#### GitHub

1. Before setting up GitHub authentication you need to create an OAuth application. Oauth2-proxy will be configured to use this application to authenticate users against a GitHub team. To create a new OAuth application, navigate to your [settings](https://github.com/settings/developers) page in your GitHub profile, click the button `New OAuth App` and fill in the form presented.
    - Application name: the name of the application will be presented to users when they are being asked to authenticate. 
    - Homepage URL: the homepage url will typically be the URL of your WKP UI i.e. `https://example.com`. 
    - Authorization callback URL: the authorization callback URL will be the URL where users are sent after they authorize with GitHub. When using oauth2-proxy this is typically a path of the main application URL that oauth2-proxy will serve i.e. `https://example.com/oauth2/callback`. If you use a `NodePort` service for your ingress controller (as mentioned above), you need to add the corresponding HTTPS port that the controller listens to, to both of these links.
2. Upon creating an OAuth application, you will be presented with a `Client ID`. Click on the `Generate new client secret` button to also generate a client secret for this application. Take note of these two values as you will be adding them to your cluster later as a Kubernetes secret. 

#### GitLab

1. Before setting up GitLab authentication you need to create an OAuth application. Oauth2-proxy will be configured to use this application to authenticate users against a GitLab group. To create a new OAuth application, navigate to your [applications](https://gitlab.com/oauth/applications) page in your GitLab profile and fill in the form presented.
    - Name: the name of the app will be presented to users when they are being asked to authenticate. 
    - Redirect URI: the redirect URI will be the URL where users are sent after they authorize with GitLab. When using oauth2-proxy this is typically a path of the main application URL that oauth2-proxy will serve i.e. `https://example.com/oauth2/callback`. If you use a `NodePort` service for your ingress controller (as mentioned above), you need to add the corresponding HTTPS port that the controller listens to to this URL.
    - Confidential: leave the checkbox checked as the client details will not be shared publicly.
    - Scopes: make sure `openid`, `profile` and `email` scopes are selected. You may select additional scopes beyond those if needed.
2. Upon creating an OAuth application, you will be presented with a `Application ID` and `Secret`. Take note of these two values as you will be adding them to your cluster later as a Kubernetes secret.

Once an OAuth application has been established in your chosen git provider, you will also need to generate a seed value that oauth2-proxy will use for issuing secure cookies. To do that issue the following command:
```
docker run -ti --rm python:3-alpine python -c 'import secrets,base64; print(base64.b64encode(base64.b64encode(secrets.token_bytes(16))));'
```

Now you are ready to configure and deploy oauth2-proxy to your cluster. First, create a secret with the OAuth application details (client id and client secret) and the cookie seed value that was generated previously. Then use the following manifest to deploy oauth2-proxy to your cluster (substituting values where necessary):

```
---
apiVersion: v1
kind: Namespace
metadata:
  name: oauth2-proxy
---
apiVersion: v1
data:
  client-id: <base64-encoded-client-id>
  client-secret: <base64-encoded-client-secret>
  cookie-secret: <base64-encoded-cookie-secret>
kind: Secret
metadata:
  creationTimestamp: null
  name: oauth2-proxy
  namespace: oauth2-proxy
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oauth2-proxy
  namespace: oauth2-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: oauth2-proxy
  template:
    metadata:
      labels:
        app: oauth2-proxy
    spec:
      containers:
      - name: oauth2-proxy
        image: quay.io/oauth2-proxy/oauth2-proxy:v7.0.1
        imagePullPolicy: Always
        args:
        ## Using github for authentication
        - --provider=github
        - --github-org=<your-github-org>
        - --github-team=<your-github-team>
        ## Uncomment these lines if using gitlab for authentication
        # - --provider=gitlab
        # - --gitlab-group=<your-gitlab-group>
        # - --redirect-url=<your-redirect-uri>
        - --email-domain="*"
        - --upstream=file:///dev/null
        - --http-address=0.0.0.0:4180
        - --set-xauthrequest=true
        - --pass-access-token=true
        env:
          - name: OAUTH2_PROXY_CLIENT_ID
            valueFrom:
              secretKeyRef:
                name: oauth2-proxy
                key: client-id
          - name: OAUTH2_PROXY_CLIENT_SECRET
            valueFrom:
              secretKeyRef:
                name: oauth2-proxy
                key: client-secret
          - name: OAUTH2_PROXY_COOKIE_SECRET
            valueFrom:
              secretKeyRef:
                name: oauth2-proxy
                key: cookie-secret
        ports:
        - containerPort: 4180
          protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: oauth2-proxy
  namespace: oauth2-proxy
spec:
  ports:
  - name: http
    port: 4180
    protocol: TCP
    targetPort: 4180
  selector:
    app: oauth2-proxy
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: oauth2-proxy
  namespace: oauth2-proxy
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod 
spec:
  rules:
  - host: <hostname-to-use> # e.g. example.com
    http:
      paths:
      - path: /oauth2
        backend:
          serviceName: oauth2-proxy
          servicePort: 4180
  tls:
  - hosts:
    - <hostname-to-use> # e.g. example.com
    secretName: wkp-tls
```

You should now have an ingress route for host `https://example.com/oauth2` that routes to the oauth2-proxy pod currently running.

### Expose the UI {#expose}

At this point, everything should be in place to expose the UI publicly. To create a new ingress route for the UI use the following  manifest. The `nginx.ingress.kubernetes.io/auth-url` and `nginx.ingress.kubernetes.io/auth-signin` annotations used will instruct NGINX to redirect unauthenticated requests to oauth2-proxy.

```
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod 
    nginx.ingress.kubernetes.io/auth-url: "https://$host:<port-if-not-443>/oauth2/auth"
    nginx.ingress.kubernetes.io/auth-signin: "https://$host:<port-if-not-443>/oauth2/start?rd=$escaped_request_uri"
    nginx.ingress.kubernetes.io/auth-response-headers: "X-Auth-Request-User, X-Auth-Request-Email"
  name: public-wkp-ui
  namespace: wkp-ui
spec:
  rules:
  - host: <hostname-to-use> # e.g. example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: wkp-ui-nginx-ingress-controller
          servicePort: 80
  tls:
  - hosts:
    - <hostname-to-use> # e.g. example.com
    secretName: wkp-tls
```

> **Note:** You may also need to add an ingress rule to exclude the /gitops/api/agent.yaml endpoint.
Please refer to the MCCP usage section of the user guide for detailed instructions on how to do that.

You should now be able to log in to the WKP UI securely by authenticating to GitHub or GitLab first.