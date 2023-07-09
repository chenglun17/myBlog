# SQL 函数

SQL 拥有很多可用于计数和计算的内建函数。

## :star:SQL Aggregate 函数

SQL Aggregate 函数计算从列中取得的值，返回一个单一的值。

- AVG() - 返回平均值
- COUNT() - 返回行数
- FIRST() - 返回第一个记录的值
- LAST() - 返回最后一个记录的值
- MAX() - 返回最大值
- MIN() - 返回最小值
- SUM() - 返回总和

### AVG 平均值

AVG 函数返回数值列的平均值（NULL 值不包括在计算中）。

```sql
SELECT AVG(column_name) FROM table_name;
```

### COUNT 汇总行数

COUNT() 函数返回匹配指定条件的行数。可以有不同的语法：

- `COUNT(*)` ：返回表中的记录数
- `COUNT(列名)` ：返回指定列的值的数目（NULL 值不包括在计算中）
- `COUNT(DISTINCT 列名)` ：返回指定列的不同值的数目

```sql
SELECT COUNT(*) FROM table_name;
SELECT COUNT(column_name) FROM table_name;
SELECT COUNT(DISTINCT column_name) FROM table_name;
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



## :star:SQL Scalar 函数

SQL Scalar 函数基于输入值，返回一个单一的值。

- UCASE() - 将某个字段转换为大写
- LCASE() - 将某个字段转换为小写
- MID() - 从某个文本字段提取字符，MySql 中使用
- SubString(字段，1，end) - 从某个文本字段提取字符
- LEN() - 返回某个文本字段的长度
- ROUND() - 对某个数值字段进行指定小数位数的四舍五入
- NOW() - 返回当前的系统日期和时间
- FORMAT() - 格式化某个字段的显示方式