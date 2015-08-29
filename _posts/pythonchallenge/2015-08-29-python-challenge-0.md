---
layout: post
title: "Python Challenge第0关闯关流程"
description: "PythonChallenge记录"
category: pyChallenge
tags: [python]
date: 2015-08-29 10:50:38
---

忘了告诉大家,这个Python Challenge是一个看图闯关的游戏,每一关都会给你一张图,然后让你自己从图中找到下一关的蛛丝马迹.(所以才可以锻炼脑洞啊~).

OK.我们打开第0关,看到了第0关的挑战   ![第一关配图](http://www.pythonchallenge.com/pc/def/calc.jpg)

啊....这是什么鬼

我们看hint  `Hint: try to change the URL address.`

让我们改变URL地址(想...)   想不出啊

好吧，先看图吧还是. 图上有一个 2的38次方,不管了,先把2的38次方算出来吧.

```python
#!/usr/bin/python
print(2**38)
```

(为了规范一点,我把每次的解决方案都直接写到py文件里)
运行输出了`274877906944`

这时我突然明朗了,让改URL地址,好吧,把URL的0改成`274877906944`.

回车...果然,跑到了第1关(第1关的地址就不给了,想去的自己跟着试一下即可).
