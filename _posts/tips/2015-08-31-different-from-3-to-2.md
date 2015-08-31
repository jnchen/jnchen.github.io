---
layout: post
title: "Python3和Python2语法不同记录"
description: "收集一些平时碰到的python3和python2语法的不同"
category: tips
tags: [python3 python]
date: 2015-08-31 15:23:38
---

```
## print

`print`是最常见的python3和python2的区别,在python2中`print`被当做一个语句来处理的.
而在python3中`print()`被当做一个内置函数来使用
另外值得注意的是字符串的格式化方法

```python
'this is a string:%s'% 'string'
#%操作符的字符串格式化
'this is a string:{0}'.format('string')
#字符串格式化表达式
```

在python2和python3中都是可以使用的,不过python中让`print`语句不换行的方法是在其后加一个`,`现在不能用了
新的方法是在`print()`函数中指定`end`参数为空即可,这样做还可以更加灵活的添加分隔符

```python
print("there no newline.",end="")
```

## urllib库

python3将urllib1和urllib2做了合并,将所有方法和属性重新分配成了一个package下的5个模块

`urllib.request`、`urllib.error`、`urllib.parse`、`urllib.response`、`urllib.robotparser`

常用的`urlopen()`方法被放到了`urllib.request`模块中

常用的url转换(python2中urllib的主要用武之地),被放到了`urllib.parse`模块

原来python2和python3的大部分url操作的方法被放到了`urllib.request`模块中

`urllib.robotparser` robot文件解析

**新的`urllib`库返回的网页信息都是bytes编码的,视情况而定解码或保存**

## 字符串

python2 中字符串有str和unicode两种类型,后者还需要在前面加一个u

```python
#python2语法
name = u'中国'
print name,
```

python3 中的字符串只有str类型,用2.x的unicode方式存储,另外增加了能够节省空间的`bytes`类型

bytes类型对应了python中的str类型(8位存储一个字符,不能直接解码unicode)

在python2中如果知道字符串的编码格式,需要通过str/unicode.decode(coding)去解码

而在python3中str.encode()可以转换为bytes   bytes.decode()可以转换为str(也可以添加参数)

