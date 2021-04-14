---
title: "The wk command"
---

Clusters are installed, upgraded and scaled with the `wk` command. It can be installed through either an RPM repository or downloaded.

:::info
**See also: `wksctl` documentation**
`wk` inherits much of its functionality from `wksctl`. Check out [the wksctl docs](https://wksctl.readthedocs.io/) for more details about the base commands.
:::

### Static binary

To download `wk` and make it executable, run:

```shell
curl -o wk https://weaveworks-wkp.s3.amazonaws.com/wk-$version-$os-amd64
chmod +x wk
mv wk /usr/local/bin/
```

Where `version` is the desired version, e.g. `2.0.3` and `os` is `linux` or `darwin`. Only `amd64` architectures are supported at this time.
