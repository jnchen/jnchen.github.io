---
layout: post
title: "Python Challenge第二关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
---

解决完上一关的问题,我们来到了第二关,照例还是有一张图
![Python 第二关图片](http://www.pythonchallenge.com/pc/def/map.jpg)

另外下面还跟了一些文字

`everybody thinks twice before solving this.`
`g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.`

当然当我们看到第二行文字以及图片的时候,我们已经知道是什么题了  这是一个字符串移位加密字符串的小例子

通过图中的提示我们可以知道`K->M` `O->Q` `E->G`但是第二段话并没有大写字母，所以我们只需要处理小写字母就好了

另外这里并没有交代位移是不是循环的(原来的`yz`是不是变成`ab`),我们先作为循环处理

于是乎代码如下
