+++
title = " Profiling kubectl"
weight = 100
+++

To profile `kubectl` the [Go tools](https://golang.org/doc/install) needs to be installed. The various kind of go profiles are described in the [the `pprof` package documentation](https://golang.org/pkg/runtime/pprof/#Profile). [A longer `pprof` tutorial](https://blog.golang.org/profiling-go-programs) can be found on the Go blog.

For kubectl, the two most interesting profiles are `block` (where do we spend time blocking, eg. waiting for I/O) and `cpu`.

We distribute a `kubectl-instrumented` package that supports two new command line options:

```
    --profile='': Name of profile to capture. One of (cpu|heap|goroutine|threadcreate|block|mutex)
    --profile-output='profile.pprof': Name of the file to write the profile to.
```

To generate a profile, use the `--profile` option:

```
$ kubectl-instrumented get nodes --profile=block
```

Generate a visualization of the profile with `pprof`. You will need to graphviz installed.

```
$ go tool pprof -png ./profile.pprof > profile.png
```
