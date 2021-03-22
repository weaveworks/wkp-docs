---
title: "Entitlements"
---

Entitlements files are necessary to run `wk`. They contain the limits
granted by the commercial agreement with Weaveworks.

There are three options to instruct `wk` where to find those entitlements
files. The options are checked in the order specified.

- The `--entitlements` CLI option can be specfied:

```console
wk setup install --entitlements /path/to/file.entitlements
```

- The `WKP_ENTITLEMENTS` environment variable can be pointed at the entitlements file:

```console
export WKP_ENTITLEMENTS=/path/to/file.entitlements
```

- By default `wk` will look in the artefacts directory for `~/.wks/entitlements`.

To check the current entitlements, run:

```console
export WKP_ENTITLEMENTS=/path/to/file.entitlements
wk entitlements
Customer    Company Name
Nodes       15
Versions    > 1.10.0 < 1.11.0
Addons      weave-net, kube-dns
Expires     Sun Jan 20 00:00:00 UTC 2019
```
