---
layout: post
title: "Github支持的markdown语法和jekyll的不同"
description: "markdown语法的tips"
category: tips
tags: [markdown jekyll]
---

## 标题语法

github支持`#`后面直接跟文字，而在jekyll的markdown引擎里，必须要再`#`后加上一个空格才可以  
标题和文字间最好有一行空格

## 文内分隔符

分割符被jekyll作为解析tags，title等元素的方法，因此在正文中不能再出现`---`

