---
title: "Downloading WKP"
---

A valid entitlements file is required to run WKP.  If you need an entitlements file, please send an email to <a href="mailto:support@weave.works">support@weave.works</a>

Binary for both Linux and Darwin https://weaveworks-wkp-releases.s3.amazonaws.com/wk-v2.5.0.tgz and checksum https://weaveworks-wkp-releases.s3.amazonaws.com/wk-v2.5.0.md5

For example

```console
$ curl -o wk-v2.5.0.tgz  https://weaveworks-wkp-releases.s3.amazonaws.com/wk-v2.5.0.tgz
$ curl -o wk-v2.5.0.md5  https://weaveworks-wkp-releases.s3.amazonaws.com/wk-v2.5.0.md5
$ diff <(openssl dgst -md5 wk-v2.5.0.tgz) wk-v2.5.0.md5
```


