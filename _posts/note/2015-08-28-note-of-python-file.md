---
layout: post
title: "Python 文件笔记"
description: "Python学习笔记之文件"
category: note
tags: [Python, note]
---

## 概念 

Python中文件是对象

## 打开文件  

`open(name[,mode[buf]])`
`name`：文件路径
`mode`：打开方式
`buf` ：缓冲buffering大小

## 文件读取方式

`read[size])`：读取文件（读取size个字节，默认读取全部）  
`readline([size])`：读取一行  
`readlines([size])`：读取完文件，返回每一行组成的列表  

## 文件写入方式  

`write(str)`：将字符串写入文件
`writelines(sequence_of_strings)`：写多行到文件  

### Python写磁盘时机
 
 1. 主动调用`close()` `flush()`方法，写缓存同步到磁盘  
 2. 写入数据量大于或者等于写缓存区，写缓存同步到磁盘  

### 文件需要及时关闭  

1. 可以及时将写缓存同步到磁盘
2. linux系统中每个进程打开文件的个数有限
3. 如果打开文件数到了系统限制，再打开文件就会失败

 
## 文件打开方式

| mode | 说明 | 注意 |
| :------: | :------: | :-----: |
|`r`| 只读方式打开|文件必须存在|
|`w`|只写方式打开|文件不存在创建文件 文件存在则清空文件内容|
|`a`|追加方式打开|文件不存在创建文件|
|`r+/w+`|读写方式打开|
|`a+`|追加和读写方式打开|

`rb` `wb` `ab` `rb+` `wb+` `ab+` 二进制打开方式  



## iter()  

将序列强制转换为迭代器

## Python文件指针  

`seek(offset[,whence])`：移动文件指针
`offset`：偏移量，可以为负数
`whence`：偏移的相对位置  

`tell()`：返回文件当前偏移


###　Python文件指针定位方式  

`os.SEEK_SET`：相对文件起始位置     0
`os.SEEK_CUR`：相对文件当前位置     1
`os.SEEK_END`：相对文件结尾位置     2

## Python文件属性  

`file.fileno()`：文件描述符
`file.mode`：文件打开权限
`file.encoding`:文件编码格式
`file.closed`：文件是否关闭

##　Python标准文件  

文件标准输入：`sys.stdin`
文件标准输出：`sys.stdout`
文件标准错误：`sys.stderr`

## Python文件命令行参数  

`sys.argv`属性，可以得到命令行参数 它是一个字符串组成的列表
第一个是`py文件`本身  

## Python文件编码   2.x

`unicode.encode(u'慕课','utf-8')`   将ASCII转换为utf-8   2.x

创建一个utf-8或者其他编码格式的文件：  
使用codecs模块提供的方法创建指定编码格式的文件  

使用指定的编码格式打开文件：
`open(fname,mod,encoding,errors,buffering)`

## OS模块调用  

`os.open(filename,flag[,mode])`：打开文件
`flag`:打开文件方式 : 

    os.O_CREATE：创建文件
    os.O_RDONLY：只读方式打开文件
    os.O_WRONLY：只写方式打开文件
    os.O_RDWR  ：读写方式打开文件


`os.read(fd,buffersize)`：读取文件
`os.write(fd,string)`   ：写入文件 2.x
`os.write(fd,bytes)`    ：写入文件 3.x
`os.lseek(fd,pos.how)`  ：文件指针操作
`os.close(fd)`          ：关闭文件

|os方法|说明|
|:----|:----|
|`access(path,mode)` |判断该文件权限,F\_OK存在, R\_OK可读,W\_OK可写,X\_OK可执行|
|`listdir(path)`|返回当前目录下所有文件组成的列表|
|`remove(path)`|删除文件|
|`rename(old,new)`|修改文件或者目录名|
|`mkdir(path[,mod])`|创建目录|
|`makedirs(path[,mode])`|创建多级目录|
|`removedirs(path)`|删除多级目录|
|`rmdir(path)`|删除目录，目录必须为空|


## os.path模块  

|os.path方法|说明|
|:----|:-----|
|`exist(path)`|当前路径是否存在|
|`isdir(s)`|是否是一个目录|
|`isfile(path)`|是否是一个文件|
|`getsize(filename)`|返回文件大小|
|`dirname(p)`|返回路径的目录|
|`basename(p)`|返回路径的文件名|

## Python configParser   2.x

ini格式：
节:[session]
参数：键=值 name= value

```python 
#2.x
import ConfigParser
cfg = ConfigParser.ConfigParser()
#3.x
import configparser
cfg  = configparser.ConfigParser()
/////////////////////////////
cfg.read('conf')#读取成功返回list，可读取多个配置文件  

#打印设置树
for i in cfg.sections():
    print(i)
    print(cfg.items(i))
    
#增加设置项和组
cfg.set('userinfo','name','zhangsan')
#删除设置项
cfg.remove_option('userinfo','name')
#删除设置组
cfg.remove_section('userinfo')

```



