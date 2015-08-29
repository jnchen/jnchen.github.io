---
layout: post
title: "Python Challenge第3关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2015-08-29 16:32:44
---

链接一转,我们来到了第3关,废话少说,看图
![PythonChallenge 第3关配图](http://www.pythonchallenge.com/pc/def/bodyguard.jpg)

看这个图我们脑洞再大肯定也没思路...于是乎下面的提示成为了问题的关键

`One small letter, surrounded by EXACTLY three big bodyguards on each of its sides.`

翻译一下`一个小字母,被严格的3个大卫士包围在两边` (这个网站的脑洞也真够大的)

好吧,我们还是想不到什么东西,我先像上一章一样随便翻一翻网页源码看看有没有什么东西....

果不其然,居然和上一关一个套路,也是在页面源码的最后有一大串注释...

```
lTRBhWBkTbRwbEpTimHCPMktFOJXsrKenghxEkyMpFagzWrGyUKXCieKHfCyLMKnLgQanMeyKSTzwnjs
/////此处省略特别多行
PBuijeoTSpsVLaOGuLVjMZXkBvVXwUuHfBihziiavGSYofPNeKsTXruMUumRRPQJzvSzJkKbtSipiqBd
```

看到这一大串的东西,我想我们差不多就有思路了,这一关是让我们在这一大串字母中`找到一个小写字母`,并且这个小写字母`左边有3个大写字母`、`右边也有3个大写字母`

思路有了,我们开始做,还是要把这一大串先放到一个文件中

```python
#!/usr/bin/python
question = open("123").read()
result = []
for i in range(4,len(question)-4):
    if question[i].islower() and question[i-1].isupper() and question[i-2].isupper() and question[i-3].isupper() and question[i-4].islower() and question[i+1].isupper() and question[i+4].islower() and question[i+2].isupper() and question[i+3].isupper():
        result.append(question[i])

print "".join(result)
```

果然出了一个类似答案的东西,我们过去试一下......OK真的成功了

**但是** 你们没有发现我们这个代码写的有多糟糕吗？

像这种`从很多字符中找到特定规则的字符串`的步骤,有一个神一样的东西叫做`正则表达式`啊!!!

于是乎,我们用正则表达式重写这个题

```python
#!/usr/bin/python
import re

question = open('123').read()
result = []
for i in re.finditer('[^A-Z][A-Z]{3}[a-z][A-Z]{3}[^A-Z]',question):
    result.append(i.group()[4])
print "".join(result)
```

(⊙o⊙)…..

原来可以写的这么简洁....(正则表达式我后续会写一个总结)

OK 此关已过
