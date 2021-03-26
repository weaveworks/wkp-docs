---
title: "Control Plane Load Balancing"
---


Configuring a load balancer in front of your control plane allows your cluster to stay responsive during both unplanned (_node crashes_) and planned (_node restarts during upgrades_) outages.

## Configuring a control plane load balancer in WKP

While following the [creating a cluster on SSH Nodes](/deploying-wkp/cluster-creation-on-ssh-nodes.md) instructions you can provide the **public** IP Address of your load balancer in the `wksConfig.controlPlaneLbAddress` field. The load balancer should route all `:6443` traffic to the internal IPs of the `master` nodes specified in `wksConfig.machines`.

## An external load balancer example using HA Proxy

One setup is to use **HA Proxy** as the load balancer on a machine external to the cluster itself but still on the same network. We'll go through how to install and setup haproxy on a CentOS 7 machine.

Given we're following the [creating a cluster on SSH Nodes](/deploying-wkp/cluster-creation-on-ssh-nodes.md) instructions and have specified the IPs of a **3 master** and **2 worker** cluster like so:


```yaml
wksConfig:
  sshConfig:
    machines:
    # Masters
    - privateAddress: 10.132.0.10
      publicAddress: 35.190.222.10
      role: master
    - privateAddress: 10.132.0.11
      publicAddress: 35.190.222.11
      role: master
    - privateAddress: 10.132.0.12
      publicAddress: 35.190.222.12
      role: master
    # Workers
    - privateAddress: 10.132.0.13
      publicAddress: 35.190.222.13
      role: worker
    - privateAddress: 10.132.0.14
      publicAddress: 35.190.222.14
      role: worker
  ```

and we have another machine that will run haproxy and be our load balancer.

```yaml
privateAddress: 10.132.0.1
publicAddress: 35.190.222.1
```

- ssh to the load balancer machine to install haproxy
  ```
  ssh 35.190.222.1
  ```
- Install haproxy with
  ```
  yum install haproxy
  ```
- Edit `/etc/haproxy/haproxy.cfg` setting the `backend kubernetes` IP addresses to your masters' **private** IPs.
  ```
  frontend kubernetes *:6443
      default_backend             kubernetes
      mode tcp
      option tcplog

  backend kubernetes
      balance     roundrobin
      mode tcp
      option tcplog
      option tcp-check
      default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100
      server master1 10.132.0.10:6443 check
      server master2 10.132.0.11:6443 check
      server master3 10.132.0.12:6443 check

  # OPTIONAL - UI that allows you to see which masters have joined the LB roundrobin
  frontend stats
      bind *:8404
      stats enable
      stats uri /stats
      stats refresh 10s
      stats admin if LOCALHOST
  ```
- Restart haproxy with
  ```
  systemctl restart haproxy
  ```
- Check that its running with `ps aux | grep haproxy`, if its not running see if its complaining about anything in particular `journalctl -u haproxy`. If its having trouble binding to a socket you might have to relax the SE restrictions with `sudo setsebool -P haproxy_connect_any=1`
- Monitor the load balancer using the stats UI at the load balancer's public IP, in this case: http://35.190.222.1:8404/stats (Note the `/stats`! `/` will give you a 503)

Your new load balancer should be ready for action. 
Continue following the [creating a cluster on SSH Nodes]({{< ref "/deploying-wkp/cluster-creation-on-ssh-nodes" >}}) instructions, updating your `config.yaml` with the load balancer's **public IP**:
```
wksConfig:
  controlPlaneLbAddress: 35.190.222.1
```
