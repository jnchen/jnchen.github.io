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

```python
#!/usr/bin/python
question = '''g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.'''
result =[]

for ch in question:
    if (ord(ch)>=ord('a'))and(ord(ch)<=ord('z')):
        result.append(chr((ord(ch)-ord('a')+2)%26+ord('a')))
    else:
        result.append(ch)

print ''.join(result)
```

然后运行这个程序我们得到了这一串乱码的明文:

`i hope you didnt translate it by hand. thats what computers are for. doing it in by hand is inefficient and that's why this text is so long. using string.maketrans() is recommended. now apply on the url.`

注意最后这一句`now apply on the url.`,我们当前的页面名字为`map.html`,`.html`后缀当然没法修改,所以我将map作为密文运行这个函数.便成功进入了下一关....


另外我们看到这一串乱码的明文中说`using string.maketrans() is recommended`(这是个什么东西)

果断开启python shell模式,输入`help(string.maketrans)` 

啊！！！！居然提示`NameError: name 'string' is not defined` ,哦,string是一个模块吧

于是输入`import string`   `help(string.maketrans)`

于是我们看到了函数的用法

```python 
maketrans(...)
    maketrans(frm, to) -> string
    
    Return a translation table (a string of 256 bytes long)
    suitable for use in string.translate.  The strings frm and to
    must be of the same length.
```

函数的定义就不说了，翻译一下下面的解释

> 返回一个转换表(256字节长的字符串)  
> 配合着string.translate使用.frm字符串和to字符串必须要是一样的长度

原来这个可以自动生成一些转换规则啊,于是我们尝试着用一下这个`string.maketrans`和`string.translate`

```python 
#!/usr/bin/python
import string
def encrypt(question):
    table = string.maketrans('abcdefghijklmnopqrstuvwxyz','cdefghijklmnopqrstuvwxyzab')
    return string.translate(question,table)
question = raw_input("please input the stirng:")
print encrypt(question)
```

果然也可以实现同样的效果...

另外我发现`string`模块有一些属性

> whitespace -- a string containing all characters considered whitespace  
> lowercase -- a string containing all characters considered lowercase letters  
> uppercase -- a string containing all characters considered uppercase letters  
> letters -- a string containing all characters considered letters  
> digits -- a string containing all characters considered decimal digits  
> hexdigits -- a string containing all characters considered hexadecimal digits  
> octdigits -- a string containing all characters considered octal digits  
> punctuation -- a string containing all characters considered punctuation  
> printable -- a string containing all characters considered printable  
 
这里面有一个`lowercase`我们可以用一下,改写我们的程序如下

```python

#!/usr/bin/python
import string

def encrypt2(question):
    table  = string.maketrans(string.lowercase,string.lowercase[2:]+string.lowercase[:2])
    return string.translate(question,table)

question = raw_input("please input the stirng:")
print encrypt2(question)
```

同样可以得到我们的结果
