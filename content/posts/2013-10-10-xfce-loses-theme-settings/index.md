---
title: Xfce loses theme settings
slug: xfce-loses-theme-settings
tags:
- bug
- error
- Linux
- theme
- xfce
id: 950
categories:
- Linux
- Tips
date: 2013-10-10 20:01:59
---

{{< figure src="xfce-logo.jpg" link="xfce-logo.jpg" title="xfce-logo" >}}Today I started my xfce desktop and it looks like ..."different". No theme loaded, default icons, no background. I tried to change theme from Xfce Settings but nothing, it doesn't work.

My .session-errors reveals a
<pre>The program 'xfsettingsd' received an X Window System error.</pre>
After a bit o googling it seems to be an [aged bug](https://bugzilla.redhat.com/show_bug.cgi?id=867455) of xfce when used on multiple monitor configuration.

The [solution](http://suluke.blogspot.it/2013/07/xfce-suddenly-not-applying-any-themes.html), or better, the workaround is to delete the file:
<pre>
    .config/xfce4/xfconf/xfce-perchannel-xml/displays.xml
</pre>
Now you can log out and log in again in your themed Xfce :-)
