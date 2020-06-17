---
title: 'NetworkManager: openvpn secrets error'
slug: networkmanager-openvpn-secrets-error
tags:
- Computers
- Linux
- network
- ubuntu
id: 263
categories:
- Computers
- Linux
date: 2011-02-14 18:20:27
---

<div>Today I tried to set up my openvpn connection through [NetwokManger](http://projects.gnome.org/NetworkManager/) (for instance, I'm using Ubuntu 10.10).</div>
<div>I imported my ovpn files (perfectly working on windows) with the NM gui without errors. Then, when I started the vpn, I got the error message: "No valid secrets"!</div>
<!--more-->
<div>Looking at syslog file i found this error line:</div>
` [1297693509.445619] [nm-vpn-connection.c:844] connection_need_secrets_cb(): NeedSecrets failed: dbus-glib-error-quark Rejected send message, 1 matched rules; type="method_call", sender=":1.4" (uid=0 pid=1129 comm="NetworkManager) interface="org.freedesktop.NetworkManager.VPN.Plugin" member="NeedSecrets" error name="(unset)" requested_reply=0 destination="org.freedesktop.NetworkManager.openvpn" (uid=0 pid=8646 comm="/usr/lib/network-manager-openvpn/nm-openvpn-servic"))`
<div>What you have to do to solve this issue is to edit your _/etc/dbus-1/system.d/nm-openvpn-service.conf_ and add these lines inside the busconfig tag:</div>
<div><del>`&lt;policy user="at_console"&gt; &lt;allow own="org.freedesktop.NetworkManager.vpnc"/&gt; &lt;allow send_destination="org.freedesktop.NetworkManager.openvpn"/&gt; &lt;/policy&gt;`</del> (Thanks to Mauro for the correction)</div>
<div>

`&lt;policy user="at_console"&gt; &lt;allow own="org.freedesktop.NetworkManager.openvpn"/&gt; &lt;allow send_destination="org.freedesktop.NetworkManager.openvpn"/&gt; &lt;/policy&gt;`

</div>
<div>I think that the same problem can be found in other NM's plugins like pptp or vpnc and can be resolved in the same way editing the corresponding .conf file.</div>
