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

conn = urllib.urlopen(url+num)
txt = conn.read()
while True:
    if txt.split(' ')[-1].isdigit():
        num = txt.split(' ')[-1]
    else:
        break
    conn = urllib.urlopen(url+num)
    txt = conn.read()
    print 'this nothing is ',num,',',txt
```

然后开跑....跑到一半退出了,果然事情没有这么顺利啊,我们观察一下记录发现 退出前输出了这样一句话
`this nothing is  16044 , Yes. Divide by two and keep going.`

果然在这里等着我们呢...翻译一下`干的漂亮,除以二继续`

好吧需要修改一下逻辑了....我们暂时先不管停止条件了....

```python
#!/usr/bin/python
import urllib

num = '12345'
url =  r'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing='

conn = urllib.urlopen(url+num)
txt = conn.read()
while True:
    if txt.split(' ')[-1].isdigit():
        num = txt.split(' ')[-1]
    else:
        num = str(int(num)/2)
    conn = urllib.urlopen(url+num)
    txt = conn.read()
    print 'this nothing is ',num,',',txt
```

我们观察记录...哈哈哈有一句`There maybe misleading numbers in the text. One example is 82683. Look only for the next nothing and the next nothing is 63579` 被我们的程序机制的过掉了

翻译一下`这可能是一个误导的数字,比如82683,你只需要看下一个nothing而且下一个nothing是63579`

哈哈,我们取的就是最后一个数字,小样~

继续看记录...我们发现答案出来以后我们的程序还以为要它除以二,所以这逗比程序还在跑

让我们想想还有什么办法能让他更好的跑呢....对了,我们上一节用过的`正则表达式`

改写程序如下

```python
#!/usr/bin/python
import urllib,re

num = '12345'

url = r'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing='

regex = r'(\d+)'

regex1 = r'Yes'

conn = urllib.urlopen(url+num)

txt = conn.read()

while True:
    if len(re.findall(regex,txt)) > 0 :
        num = re.findall(regex,txt)[-1]
    elif len(re.findall(regex1,txt)) > 0 :
        num = str(int(num)/2)
    else:
        print 'The key is ',txt
        break;
    conn = urllib.urlopen(url+num)
    txt = conn.read()
    print 'this nothing  is',num,',',txt
```

OK大功告成了,去下一关吧
