---
layout: post
title: "Python Challenge第6关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2017-03-14 15:58:13
---

本关图片![Python Challenge第6关配图](http://www.pythonchallenge.com/pc/def/channel.jpg)


沉寂了一年多，终于从无所事事中走出来，决定重新做一些有意义的事情

来到这一关之后，我卡了很久。看到图片之后就想到了拉链`zip`，但是不知道怎么才能有这个zip文件

于是乎，我开了挂，去百度了一下，原来是要把url改成channel.zip

修改完以后，果然，下载下来一个包含了很多txt文件的zip文件

看了一下里面的内容，发现和第4关非常相似，只不过由页面变成了压缩包里的文件

于是乎，祭出`zipfile` 模块开整吧

基于刚才的思路，代码如下

```python
#!/usr/bin/env python
import zipfile,re

next = '90052'
regex = re.compile(r'[0-9]+')
z = zipfile.ZipFile(r"channel.zip")
while True:
	next = z.open(next+".txt").read()
	print "next is "+next
```

但是执行到最后发现直接报错了,我找到报错之前的next值,看了一下里面的内容(我就不说文件名了，自己去找出来)


`Collect the comments.` `收集注释`

我们知道zipfile中有一个函数`getinfo()`可以读取文件的信息，其中有一个`comment`保存着文件的注释信息，于是修改程序，将所有的注释输出试试看


```python
#!/usr/bin/env python
import zipfile,re

list = []
next = '90052'
regex = re.compile(r'[0-9]+')
z = zipfile.ZipFile(r"channel.zip")
while True:
	info = z.getinfo(next+'.txt').comment
	print "info :"+info
	list.append(info)

	next = z.open(next+".txt").read()
	try:
		next = regex.findall(next)[0]
		print "next is "+next
	except:
		break
print ''.join(list)
```


运行.....done. 本关结束
