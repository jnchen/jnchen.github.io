---
layout: post
title: "Python urllib模块"
description: "Python学习笔记之urllib模块"
category: 笔记
tags: [Python, note]
date: 2015-08-28 09:48:37
---

*python3中urlib拆分为urllib.request,urllib.parse,urllib.error*

### urlopen  

`urlopen(url[,data[,proxies]])`打开一个url,返回一个文件对象
data 为post方法传递的数据(将dict用`urlencode()`编码)

返回对象的方法:

`read()`、`readline()`、`readlines()`、`fileno()`、`close()`和文件对象一致  
`info()` 返回一个httplib.HTTPMessage对象,表示服务器返回的头信息
`getcode()` 返回的http状态码,200成功404未找到
`geturl()` 返回请求的url

### urlretrieve

`urlretrieve(url[,filename[,reporthook[,data]]])`将url的文件下载到本地磁盘,不指定filename,则存成临时文件

返回一个二元组(filename,mine_hdrs : httplib.HTTPMessage)

### urlcleanup

清除由`urlretrieve`产生的缓存

### quote(url)和quote_plus(url)

将url编码

### unquote(url)和unquote_plus(url)

将被编码的url解码

### urlencode(query)

将dict转换为url的形式

```python
params = urllib.urlencode({'spam':1,'eggs':2,'bacon':0})
params

#结果为 'eggs=2&bacon=0&spam=1'
```

### pathname2url(path)

将本地路径转换为url,并且自动执行了`quote()`函数

### url2pathname(path)

接受一个被编码的url并自动执行`unquote()`函数,转换为本地路径

### getproxies()

获取代理


