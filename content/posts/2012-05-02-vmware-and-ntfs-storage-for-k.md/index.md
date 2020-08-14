---
title: VMware and NTFS storage for vmdk
slug: vmware-and-ntfs-storage-for-k.md
tags:
- Linux
- ntfs
- vmware
- windows
id: 685
categories:
- Computers
- Linux
date: 2012-05-02 18:49:23
---

I face the problem of having vmware disks files (vmdk) on ntfs partition (for sharing them between windows and linux installations).

When I run vmware with this configuration in linux I get an hight CPU usage by _ntfs.mount_ process. Many blogs says that adding _mainMem.useNamedFile=FALSE_ to virtual machine configuration file will fix this issue.

This probably worked only with older vmware versions.

Then I found [this](http://www.ajopaul.com/2011/07/22/ubuntu-vmware-and-mount-ntfs-high-cpu-usage-fix/).

{{< figurelink src="screenshot.png" >}}

It says to change the location for snapshot and suspend files to a non ntfs partition. This just works!!
