---
layout: post
title: "Python Challenge第5关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2015-08-29 23:13:46
---

本关图片![Python Challenge第5关配图](http://www.pythonchallenge.com/pc/def/peakhell.jpg)

下面有一行提示`pronounce it` `读出来`

原谅我的英语不好,我还是邮件源代码看看有什么收获吧...

然后我们发现了一个不同寻常的HTML标记

```html
<peakhell src="banner.p">
<!-- peak hell sounds familiar ? -->
</peakhell>
```

看注释已经很明显了,是提示你用一个和peak读音很像的东西...

我想了半天,好吧应该是`pickle` 那么肯定要有一个持久化的文件了,嗯,应该是`banner.p`

我们试着弄下来看一下

```python
import urllib,pickle

txt = urllib.urlopen('http://www.pythonchallenge.com/pc/def/banner.p').read()
f = open('obj1','w+')
f.write(txt)
f.seek(0)
obj = pickle.load(f)
f.close()
print obj
```

我们发现obj是一个嵌套的列表 列表中存了23个列表 内部列表又存了若干个tuple

到这里我承认我脑洞不够大...去搜索了一下...

好吧,这原来是想让你打印出来,23个列表是23行,`每个元组里保存了要打印的字符和打印几次`

我们将这个obj按照上述逻辑打印一下试试,果然出现了一个图案....就是下一关的密码..代码如下

```python
#!/usr/bin/python
import urllib,pickle

txt = urllib.urlopen('http://www.pythonchallenge.com/pc/def/banner.p').read()

f = open('obj1','w+')

f.write(txt)

f.seek(0)

obj = pickle.load(f)

f.close()
line =[]
for i in obj:
    for k,v in i:
        for j in range(0,int(v)):
            line.append(k)
    print "".join(line)
    line =[]
```
