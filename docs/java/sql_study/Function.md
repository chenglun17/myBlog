# SQL 函数

SQL 拥有很多可用于计数和计算的内建函数。

## :star:Aggregate (统计,聚合) 函数

SQL Aggregate 函数计算从列中取得的值，返回一个单一的值。

- AVG() - 返回平均值
- COUNT() - 返回行数的总数
- SUM() - 返回数值的总和
- FIRST() - 返回第一个记录的值
- LAST() - 返回最后一个记录的值
- MAX() - 返回最大值
- MIN() - 返回最小值

### AVG 平均值

AVG 函数返回数值列的平均值（NULL 值不包括在计算中）。

```sql
SELECT AVG(column_name) FROM table_name;
```

### COUNT 汇总行数

COUNT() 函数**返回查询指定条件的行数**。可以有不同的语法：

- `COUNT(*)` ：返回表中满足条件的记录的**行数**
- `COUNT(列名)` ：返回满足条件的记录的**列数**（**NULL 值不包括在计算中**）
- `COUNT(DISTINCT 列名)` ：返回指定列的不同值的数目

```sql
SELECT COUNT(*) FROM table_name -- 返回表中所有的记录数

SELECT COUNT(column_name) FROM table_name;

SELECT COUNT(DISTINCT column_name) FROM table_name;
```

### SUM 求数值和

SUM() 函数**返回数值列的总数**。sum仅对数值起作用。

```sql
SELECT SUM(column_name) FROM table_name;
```



### FIRST 第一个值

FIRST() 函数返回指定的字段中第一个记录的值。

**提示：**可使用 ORDER BY 语句对记录进行排序。

```sql
SELECT FIRST(column_name) FROM table_name;
```

### LAST 最后一个值

LAST() 函数返回指定的列中最后一个记录的值。

```sql
SELECT LAST(column_name) FROM table_name;
```

MySQL 语法：

```mysql
SELECT column_name FROM table_name
	ORDER BY column_name ASC
	LIMIT 1;
```



### MAX 最大值

MAX() 函数返回指定列的最大值（NULL 值不包括在计算中）。

```sql
SELECT MAX(column_name) FROM table_name;
```

### MIN 最小值

MIN() 函数返回指定列的最小值（NULL 值不包括在计算中）。

```sql
SELECT MIN(column_name) FROM table_name;
```

**📢 注意：** MIN 和 MAX 也可用于文本列，以获得按字母顺序排列的最高或最低值。



## :star:Scalar (标量) 函数

SQL Scalar 函数基于输入值，返回一个单一的值。

- UCASE() - 将某个字段转换为大写
- LCASE() - 将某个字段转换为小写
- MID() - 从某个文本字段提取字符，MySql 中使用
- SubString(字段，1，end) - 从某个文本字段提取字符
- LEN() - 返回某个文本字段的长度
- ROUND() - 对某个数值字段进行指定小数位数的四舍五入
- NOW() - 返回当前的系统日期和时间
- FORMAT() - 格式化某个字段的显示方式

### UCASE / UPPER 大写

UCASE() 函数把字段的值转换为大写。

```sql
SELECT UCASE(column_name) FROM table_name;
```

用于 SQL Server 的语法：

```sql
SELECT UPPER(column_name) FROM table_name;
```

### LCASE  / LOWER 小写

LCASE() 函数把字段的值转换为小写。

```sql
SELECT LCASE(column_name) FROM table_name;
```

用于 SQL Server 的语法：

```sql
SELECT LOWER(column_name) FROM table_name;
```



### MID 提取字符

MID() 函数用于从文本字段中提取字符。

```sql
SELECT MID(column_name[, start, length]) FROM table_name;
```

- `column_name`： 必需。要提取字符的字段
- `start`：必需。规定开始位置（起始值是 1）
- `length`：可选。要返回的字符数。如果省略，则 MID() 函数返回剩余文本



### LEN / LENGTH 长度

LEN() 函数返回文本字段中值的长度。

```sql
SELECT LEN(column_name) FROM table_name;
```

用于 MySQL 的语法：

```sql
SELECT LENGTH(column_name) FROM table_name;
```



### ROUND 数值取舍

ROUND() 函数用于把数值字段舍入为指定的小数位数。

```sql
SELECT ROUND(column_name[, decimals]) FROM table_name;
```

> 📢 注意：`ROUND` 取舍是 **四舍五入** 的！

- `column_name`：列名
- `decimals`：精度，可选。规定要返回的小数位数



### NOW / SYSDATE 当前时间

NOW() 函数返回当前系统的日期和时间。

```sql
SELECT NOW() FROM table_name;
```

用于 SQL Server 的语法：

```sql
SELECT SYSDATE FROM table_name;
```



### FORMAT 格式化

FORMAT() 函数用于对字段的显示进行格式化。

```sql
SELECT FORMAT(column_name, format) FROM table_name;
```

- `column_name`：列名，必须，要格式化的字段
- `format`：必需，规定格式





## :star:分组统计

### GROUP BY 子句

GROUP BY 子句用于**结合聚合函数，根据一个或多个列对结果集进行 分组**。

```sql
SELECT column_name, aggregate_function(column_name) 
	FROM table_name
	WHERE column_name operator value
	GROUP BY column_name;
```

- `GROUP BY column_name`：按照 `column_name`来分组查询

### HAVING 子句

在 SQL 中增加 HAVING 子句原因是，**WHERE 关键字无法与聚合函数一起使用**。

HAVING 子句用于**对 GROUP BY 分组后的结果进行 过滤**。

```sql
SELECT column_name, aggregate_function(column_name)
	FROM table_name
	WHERE column_name operator value
	GROUP BY column_name HAVING aggregate_function(column_name) operator value;
```















