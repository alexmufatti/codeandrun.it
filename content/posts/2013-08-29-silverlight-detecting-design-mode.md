---
title: 'Silverlight: detecting design mode'
slug: silverlight-detecting-design-mode
tags:
- 'c#'
- Silverlight
- tips
id: 935
categories:
- Computers
- English
- Programming
date: 2013-08-29 18:36:11
---

Just a quick tip useful when you have to do something special for Silverlight designer to work correctly.
```csharp
bool _inInDesignMode = DesignerProperties.IsInDesignTool;
```
