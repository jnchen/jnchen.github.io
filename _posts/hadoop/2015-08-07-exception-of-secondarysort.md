---
layout: post
title: "自定义sortComparator出错"
description: "mapreduce程序进行二次排序是，不正确的自定义sortCompartor分析"
category: hadoop
tags: [mapreduce,hadoop,secondarysort]
---

## 问题描述:在自定义sortComparator的时候发生错误

前几天写一个mapreduce join的程序，源文件格式为

> name.txt
> 1 hat
> 2 shoe
> 3 t-shirt
> 
> price.txt
> 1 20
> 1 50
> 2 40
> 3 10
> 3 25
> 2 16

大致的思路是将数据按照key来map，然后将数据排序，保证name排在最前，数字排在名字后，并且按正序或反序排列。在reduce的时候取`valuelist`的第一个元素作为本组的key

在实现的过程中，用到了自定义`sortComparator`(当然我还用了自定义Key),把key和value全部装进key中，自定义`partitioner`让它按照key分区，自定义`groupingComparator`使得数据可以正常的聚集

``` java 
//自定义的groupingCoparator
public static class MyComparator extends WritableComparator {
		@Override
		public int compare(WritableComparable a, WritableComparable b)      
		{
			// TODO Auto-generated method stub
			MyKey ma = (MyKey) a;
			MyKey mb = (MyKey) b;
			return ma.getKey().compareTo(mb.getKey());
	    }
}

//自定义的sortComparator
public static class MyValueComparator extends WritableComparator {
		@Override
		public int compare(WritableComparable a, WritableComparable b) {
			if (!((MyKey) a).getKey().toString().equals(((MyKey) b).getKey().toString())){
				return ((MyKey) a).getKey().compareTo(((MyKey) b).getKey());
			} else {
				Text v1 = ((MyKey) a).getValue();
				Text v2 = ((MyKey) b).getValue();

				if (Character.isDigit(v1.toString().charAt(0))
						&& Character.isDigit(v2.toString().charAt(0))) {
					return v1.compareTo(v2);
				} else if (Character.isLetter(v1.toString().charAt(0))
						&& Character.isLetter(v2.toString().charAt(0))) {
					return v1.compareTo(v2);
				} else if (Character.isDigit(v1.toString().charAt(0))
						&& Character.isLetter(v2.toString().charAt(0))) {
					return -v1.compareTo(v2);
				} else if (Character.isLetter(v1.toString().charAt(0))
						&& Character.isDigit(v2.toString().charAt(0))) {
					return -v1.compareTo(v2);
				} else {
					return -1;
				}
			}
		}
	}
```

但是运行后却报错了

**图片**

经过仔细的分析问题出现在自定义`sortComparator`和`goupingComparator`(这个当时还没运行到，但是也错了)上，在这里有一个很容易被忽略掉的问题

我们在继承`WritableComparator`的时候， 不能仅仅实现`compare`函数就可以，还需要写一个显式的构造函数，传入compare的类

```
//以groupingComparator为例(这个代码比较少)
public static class MyComparator extends WritableComparator {
		/////////////////////////////////////////
		///////////添加的构造函数//////////////////
		/////////////////////////////////////////
		public MyComparator() {
			super(MyKey.class, true);
		}
        ////////////////////////////////////
        
        
		@SuppressWarnings("rawtypes")
		@Override
		public int compare(WritableComparable a, WritableComparable b) {
			// TODO Auto-generated method stub
			MyKey ma = (MyKey) a;
			MyKey mb = (MyKey) b;
			return ma.getKey().compareTo(mb.getKey());
		}

	}
```

添加完构造函数以后，程序就可以正常的运行了。

最后说一下这个思路并是不很通用，要求name.txt要唯一，当然我们可以在mapreduce前开一个去重任务。这个过程的本质实际上是一个**二次排序**的过程。
最后附上全部代码:

``` java

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.WritableComparator;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Partitioner;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class SortedKV {
	public static class KeyValueMapper extends
			Mapper<Object, Text, MyKey, Text> {
		private MyKey tkey = new MyKey();
		private Text tvalue = new Text();

		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
			String[] logs = value.toString().split(" ");
			if (logs[0].matches("([a-z]+)")) {
				tkey.setKey(new Text(logs[1]));
				tkey.setValue(new Text(logs[0]));
				tvalue.set(logs[0]);
			} else {
				tkey.setKey(new Text(logs[0]));
				tkey.setValue(new Text(logs[1]));
				tvalue.set(logs[1]);
			}
			context.write(tkey, tvalue);
		}
	}

	public static class MyValueComparator extends WritableComparator {
		public MyValueComparator() {
			super(MyKey.class, true);
		}

		@SuppressWarnings("rawtypes")
		@Override
		public int compare(WritableComparable a, WritableComparable b) {
			if (!((MyKey) a).getKey().toString().equals(((MyKey) b).getKey().toString())){
				return ((MyKey) a).getKey().compareTo(((MyKey) b).getKey());
			} else {
				Text v1 = ((MyKey) a).getValue();
				Text v2 = ((MyKey) b).getValue();

				if (Character.isDigit(v1.toString().charAt(0))
						&& Character.isDigit(v2.toString().charAt(0))) {
					return v1.compareTo(v2);
				} else if (Character.isLetter(v1.toString().charAt(0))
						&& Character.isLetter(v2.toString().charAt(0))) {
					return v1.compareTo(v2);
				} else if (Character.isDigit(v1.toString().charAt(0))
						&& Character.isLetter(v2.toString().charAt(0))) {
					return -v1.compareTo(v2);
				} else if (Character.isLetter(v1.toString().charAt(0))
						&& Character.isDigit(v2.toString().charAt(0))) {
					return -v1.compareTo(v2);
				} else {
					return -1;
				}
			}
		}
	}

	public static class MyComparator extends WritableComparator {
		public MyComparator() {
			super(MyKey.class, true);
		}

		@SuppressWarnings("rawtypes")
		@Override
		public int compare(WritableComparable a, WritableComparable b) {
			// TODO Auto-generated method stub
			MyKey ma = (MyKey) a;
			MyKey mb = (MyKey) b;
			return ma.getKey().compareTo(mb.getKey());
		}

	}

	public static class MyPartitioner extends Partitioner<MyKey, Text> {

		@Override
		public int getPartition(MyKey key, Text value, int numPartitions) {
			// TODO Auto-generated method stub
			return key.getKey().hashCode() % numPartitions;
		}

	}

	public static class MyKey implements WritableComparable<MyKey> {
		private Text tkey = null;
		private Text tValue = null;

		public MyKey() {
			tkey = new Text();
			tValue = new Text();
		}

		public Text getKey() {
			return this.tkey;
		}

		public void setKey(Text key) {
			this.tkey = key;
		}

		public Text getValue() {
			return this.tValue;
		}

		public void setValue(Text value) {
			this.tValue = value;
		}

		public void readFields(DataInput arg0) throws IOException {
			// TODO Auto-generated method stub
			tkey.readFields(arg0);
			tValue.readFields(arg0);
		}

		public void write(DataOutput arg0) throws IOException {
			// TODO Auto-generated method stub
			tkey.write(arg0);
			tValue.write(arg0);
		}

		public int compareTo(MyKey o) {
			// TODO Auto-generated method stub
			return tValue.compareTo(o.getValue());
			// return tkey.compareTo(o.getKey());
		}

	}

	public static class KeyValueReducer extends
			Reducer<MyKey, Text, Text, Text> {
		// private Text tkey = new Text();

		public void reduce(MyKey key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			String newKey = null;
			int count = 0;
			for (Text value : values) {
				if (count == 0) {
					newKey = value.toString();
					count++;
				} else {
					context.write(new Text(newKey), key.getValue());
				}
				// context.write(key.getKey(),key.getValue());
			}
		}
	}

	public static void main(String[] args) throws IOException,
			ClassNotFoundException, InterruptedException {
		// TODO Auto-generated method stub
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args)
				.getRemainingArgs();
		if (otherArgs.length < 2) {
			System.err
					.println("Usage: com.caojingchen.SortedKeyValue.SortedKV <in> [<in>...] <out>");
			System.exit(2);
		}
		Job job = Job.getInstance(conf, "SortedKV");
		job.setJarByClass(SortedKV.class);
		job.setMapperClass(KeyValueMapper.class);
		job.setReducerClass(KeyValueReducer.class);

		job.setMapOutputKeyClass(MyKey.class);
		job.setMapOutputValueClass(Text.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		job.setPartitionerClass(MyPartitioner.class);
		job.setSortComparatorClass(MyValueComparator.class);
		job.setGroupingComparatorClass(MyComparator.class);

		FileInputFormat.setInputDirRecursive(job, true);
		for (int i = 0; i < otherArgs.length - 1; ++i) {
			FileInputFormat.addInputPath(job, new Path(otherArgs[i]));
		}
		FileOutputFormat.setOutputPath(job, new Path(
				otherArgs[otherArgs.length - 1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1);
	}

}

```


