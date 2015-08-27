# The Note of Python Language

---
layout: post
title: python 基础学习笔记 
category: 笔记
tags: [python , note]
description:一些python的基本语法和需要注意的地方 
---

##Python集合  

1. 有序集合 list tuple str 和 unicode
2. 无序集合 set
3. 无序集合并具有key-value dict


####有序集合的迭代  

`enumerate()`函数

```python
L = ['Adam','Lisa','Bart','Paul']
for index,name in enumerate(L):
    print index,'-',name
```
####字典的迭代  

如果只要迭代字典的value：  
1. `values()`  
它把一个dict转换成了包含value的list  
2. `itervalues()`
它会在迭代过程中一次从dict中取出value，所以itervalues()方法比values()方法节省了list所需的内存

如果需要迭代字典的key和value：  
1. `items()`  
它把一个dict转换成了包含(key,value)的tuple的list
2. `iteritems()`
和itervalues()类似，它是在迭代的过程中不断给出tupe，不占用额外的内存

---

##Unicode字符串  

在需要中文字符串前加`u`  
如果恰好也是`raw`的字符串，则在字符串前加`ur`  
在python2的环境中，如果整个python文件的格式为Unicode编码，则需要在最前面添加   

    # -*- coding:utf-8 -*-  
    
---

##布尔类型  

只有`True`和`False`两种值

1. and 与运算
2. or  或运算
3. not 非运算  

布尔类型还可以和其他数据类型做and or not 运算，python会把`0`、`空字符串`、`None`看成`False`，`其他数值`和`非空字符串`都看成`True`

---

##List添加元素  

1. `append(element)`添加到list尾部
2. `insert(index,element)`添加到指定位置，该位置以及以后的元素都后移一位
3. `pop()` 将在尾部的元素删除并返回
4. `pop(index)`将index位置的元素删掉

---

##tuple  

创建单元素tuple的时候需要在该元素后增加一个`,`
```python
t = (1,)
```   

---

##代码缩进  

Python将具有相同缩进的代码视为代码块  
缩进的格式:`4个空格`，不要使用Tab，更不要混合Tab和空格

---

##Python分支语句  

```python
if condition:
    statement
else:
    statement
```

或者是  

```python
if condition1:
    statement
elif condition2:
    statement
else:
    statment
```

---

##Python循环  

for：

```python
for i in Collection:
    statement
```

while:

```python
while condition:
    statement
```

`break`: 退出循环
`continue`:继续循环

---

##Dict 字典  

访问字典元素时，若key不存在就会KeyError，解决方法有两种  
1. 访问前先判断key是否存在 用in操作符   

```python
    if 'key' in d:
        statement
```

2. 使用dict本身提供的get方法，在Key不存在时，返回None

```python
d.get('key')
```
    
---

##Set集合  

set持有一系列元素，但不能重复，而且无序
创建的方式是调用`set()`并且传入一个list，list的元素将作为set的元素  
`item in set` 确定item是否属于set 是返回`True` 不属于返回`False`  

####往Set中添加元素 *`add()`* 

####删除set中的元素 *`remove()`*  

删除之前需要判断一下  

```python
if item in set:
    set.remove(item)
```

---

##函数  

如果调用函数时传入的参数数量不对，或者参数数量对而参数类型不能被函数所接受，将会报TypeError的错误  

定义函数用`def`语句，依次写出`函数名`，`括号`，括号中的`参数`和`冒号` 然后编写`函数体`，函数的返回值用`return`返回  
```python
def my_fuc(x):
    if x==1:
        return 'x==1'
    else:
        return 'x!=1'
```

`return None`可以简写为`return`  

####Python的函数还可以返回多个值  

其本质是返回了一个tuple，并将tuple的值赋值给接收的变量

```python
import math
def move(x,y,step,angle):
    nx = x + step * math.cos(angle)
    ny = y + step * math.sin(angle)
    return nx,ny
    
x,y = move(100,100,50,math.pi / 6)
print x,y
```

####函数定义时的默认参数  

默认参数只能定义在必需参数的后面

####定义可变参数  

在定义函数时，参数的前面加一个`*`可以传入0个到多个参数给它  
其原理是把多个参数包装成一个tuple传递给它，所以在函数内部把可变参数当成一个tuple来读取  

```python
def average(*args):
    sum = 0
    for item in args:
        sum = sum + item
    return sum / len(args)

```

---

##List切片操作

    List[begin:end:interval](begin<=end)
    
从begin起(包含begin)每interval取一个数一直到end(不包含end)结束，支持倒序切片  
字符串可以当做List来切片

---

##列表生成式  

1. 想生成[1x1,2x2,3x3,...,10x10] 简单生成式

```python
L = [x*x for x in range(1,11)]
Result:[1,4,9,16,25,36,49,64,81,100]
```

2. 想生成一个表格 复杂生成式

```python
d = {'Adam':95,'Lisa':85,'Bart':59}
tds = ['<tr><td>%s</td><td>%s</td>' % (name,score) for name,score in d.iteritems()]
print '<table>'
print '<tr><th>Name</th><th>Score</th></tr>'
print '\n'.join(tds)
print '</table>'
```

*字符串的join()方法可以把一个list拼接成一个字符串*  
3. 条件过滤  

```python
L = [x * x for x in range(1,11) if x % 2 == 0]
Result:[4,16,36,64,100]
```

4. 多层表达式  

```python
L = [m + n for m in 'ABC' for n in '123']
Result:['A1','A2','A3','B1','B2','B3','C1','C2','C3']
```

