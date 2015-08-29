---
layout: post
title: "Python Challenge第2关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2015-08-29 13:18:38
---

进入第二关,我们看到给的图瞬间崩溃了...

![第2关 配图](http://www.pythonchallenge.com/pc/def/ocr.jpg)

下面还有提示文字: `recognize the characters. maybe they are in the book, but MAYBE they are in the page source.`

这些字符`in the book`我看是不大可能了,我用眼睛看都分不清是什么字符...

还有一句是`in the page source` 我们右键查看页面的源代码

将dom打开,往下翻翻翻..最后发现了一大片被注释的文字

啊哈,找到你了

```
<!--
%%$@_$^__#)^)&!_+]!*@&^}@[@%]()%+$&[(_@%+%$*^@$^!+]!&_#)_*}{}}!}_]$[%}@[{_@#_^{*
////此处省略超级超级多行
#@}&$[[%]_&$+)$!%{(}$^$}*
-->
```

居然这么多,也不知道要在里面找什么.....

后来我想了一下,因为我们要用url来找到下一关的页面,因此一定要是字母啊,不然输不进去网址啊~(有人会说#也可以啊....你见过这么多#的url地址吗)

当然目前为止一切还只是个猜测,我们写程序验证一下

```python
#!/usr/bin/python
question = raw_input()


result = []
for ch in question:
   if ch.isalpha():
        result.append(ch)
print "".join(result)
```

将这一大片字符粘贴到shell.....................啊,我的shell怎么了，字符乱飞啊(猜测可能是因为这些字符都是一些特殊字符,可能有其他副作用发生了)

看来不能直接输入啊,我们从文件读取好了,将这一大串保存为`source.txt`

```python
#!/usr/bin/python
question = open('source.txt').read()

result = []
for ch in question:
   if ch.isalpha():
        result.append(ch)
print "".join(result)
```

还真的找到了几个字母,我们试一下能不能进入下一关........成功！

