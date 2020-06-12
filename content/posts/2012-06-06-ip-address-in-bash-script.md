---
title: IP Address in bash script
tags:
- awk
- bash
- ip address
- networking
id: 712
categories:
- Linux
- Tips
date: 2012-06-06 15:58:04
---

In linux you can get all of yours inferfaces IP with something like this:

```bash
sudo ifconfig  | grep 'inet addr:'| awk -F: '{ print $2}' | awk '{ print $1 }'
```

For example on my machine this command will output:
<pre>192.168.247.101
127.0.0.1
192.168.123.1
172.16.209.1</pre>
