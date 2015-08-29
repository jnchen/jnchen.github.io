---
layout: post
title: "Python Challenge第4关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2015-08-29 23:13:46
---

OK,我们来到了第四关
有人问了....我怎么没进第四关,第三关的答案跑出来以后我就不知道怎么走了......(我不给直接答案)

输入第三关最后的结果,页面上不是有个文件名嘛,输入那个文件名,才算真正来到了第四关 上图
![python challenge 第4关配图](http://www.pythonchallenge.com/pc/def/chainsaw.jpg)

我们看到页面上连个提示也没了...但是手贱的你很快就会发现.原来这个图片是有链接的,点进去,我们这一关正式开始

只见页面上只有一行文字`and the next nothing is 44827`

我们看到链接中有相似之处,于是乎将`44827`替换到现在的数字

`Your hands are getting tired and the next nothing is 94485` OK,思路已经很明了了,这是一个涉及到网络编程的题呗..需要让我们在网页上截取数字,并且更新下一次网页 

也不知道跑着跑着会有什么变化,先简单写一下试试吧....

```python
#!/usr/bin/python
import urllib

num = '12345'
url =  r'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing='

while True:
    
