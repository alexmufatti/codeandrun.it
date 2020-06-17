---
title: vmware crash on startup after curl update
slug: vmware-crash-on-startup-after-curl-update
tags:
- curl
- debian
- Linux
- patch
- sid
- vmware
id: 924
categories:
- Linux
date: 2013-08-20 16:43:03
---

After today update of debian Sid VMWare keep crashing on startup without any interesting log.

![vmware](/images/2013/08/vmware.jpg)After a bit of googling I found [this](https://bugs.archlinux.org/task/33779?project=1&amp;order=dateopened&amp;sort=desc "VMWare crash"). The crash it's caused by the curl update that changed the lib interface.

There are two ways of solving this: downgrade Curl (i.e. using snapshot debian) or applying a patch that force vmware to use its own libcurl instead of the system one.

Thewe are the 2 patches, one for vmware and one for vmplayer:

```diff
--- /usr/bin/vmware-original 2013-02-09 18:22:36.194459631 +0100
+++ /usr/bin/vmware 2013-02-09 18:22:45.234459997 +0100
@@ -93,6 +93,7 @@

if "$BINDIR"/vmware-modconfig --appname="VMware Workstation" --icon="vmware-workstation" &amp;&amp;
/sbin/modinfo vmmon; then
+ export LD_LIBRARY_PATH=/usr/lib/vmware/lib/libcurl.so.4
exec "$libdir"/bin/"vmware" "$@"
fi
```


```diff
--- /usr/bin/vmplayer-original 2013-01-30 22:06:11.253190017 +0100
+++ /usr/bin/vmplayer 2013-02-09 20:38:33.488125792 +0100
@@ -93,6 +93,7 @@

if "$BINDIR"/vmware-modconfig --appname="VMware Player" --icon="vmware-player" &amp;&amp;
/sbin/modinfo vmmon; then
+ export LD_LIBRARY_PATH=/usr/lib/vmware/lib/libcurl.so.4
exec "$libdir"/bin/"vmplayer" "$@"
fi
```


I decided to apply the patches so that I can update the whole system.
