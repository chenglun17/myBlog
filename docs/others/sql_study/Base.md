# SQL 基础

## :star:SQL 基本概念

### SQL 是什么

SQL (Structured Query Language，结构化查询语言) 是用于管理**关系数据库管理系统**（RDBMS）。

> **RDBMS 指关系型数据库管理系统，全称 Relational Database Management System。**
>
> **RDBMS 是 SQL 的基础，同样也是所有现代数据库系统的基础。**
>
> **RDBMS 中的数据存储在被称为表的数据库对象中。**
>
> **表是相关的数据项的集合，它由列和行组成。**

SQL 的范围包括数据插入、查询、更新和删除，数据库模式创建和修改，以及数据访问控制。

### SQL 能做什么

- SQL 面向数据库执行查询
- SQL 可从数据库取回数据
- SQL 可在数据库中插入新的记录
- SQL 可更新数据库中的数据
- SQL 可从数据库删除记录
- SQL 可创建新数据库
- SQL 可在数据库中创建新表
- SQL 可在数据库中创建存储过程
- SQL 可在数据库中创建视图
- SQL 可以设置表、存储过程和视图的权限

### SQL 的分类

可以把 SQL 分为五大类型：

- <strong style="color:#DD5145">DDL（Data Definition Language，数据定义语言）</strong>：用来定义数据库对象：库、表、列等

  操作数据对象的语言，包括创建 create、删除 drop、修改 alter 、清除 truncate 数据库对象。

- <strong style="color:#DD5145">DML（Data Manipulation Language，数据操作语言）</strong>：用来定义数据库记录（数据）

  主要有增插 insert、更新 update、删除 delete 等操作表的语句。

  DML语句修改后数据将保持较好的一致性。

- <strong style="color:#DD5145">DCL（Data Control Language，数据控制语言）</strong>：用来定义访问权限和安全级别

  主要有 grant、revoke 语句。

- <strong style="color:#DD5145">DQL（Data Query Language，数据查询语言）</strong>：用来查询记录（数据）

  主要由于 select 关键字完成，查询语句是 SQL 语句中最复杂，功能最丰富的语句。

- <strong style="color:#DD5145">事务控制语句</strong>：主要有 commit、rollback 和 savepoint 三个关键字完成



### SQL 语法要求

- SQL 语句可以单行或多行书写，末端使用分号结尾
- 分号是在数据库系统中分隔每条 SQL 语句的标准方法
- 可以用空格和缩进来来增强语句的可读性
- 关键字不区别大小写，建议使用大写

在本文中，我们将在每条 SQL 语句的末端使用分号。



## :star:SQL 数据类型

- **int**：整型
- **double**：浮点型，例如 double(5,2)表示最多 5 位，其中必须有 2 位小数，即最大值为 999.99；
- **decimal**：泛型型，在表单线方面使用该类型，因为不会出现精度缺失问题；
- **char**：固定长度字符串类型；(当输入的字符不够长度时会补空格)
- **varchar**：固定长度字符串类型；
- **text**：字符串类型；
- **blob**：字节类型；
- **date**：日期类型，格式为：yyyy-MM-dd；
- **time**：时间类型，格式为：hh:mm:ss
- **timestamp**：时间戳类型；



## :star:SQL 基本语句

- **[CREATE DATABASE](#create-database)** - 创建新数据库

- **ALTER DATABASE** - 修改数据库

  ------

- **[CREATE TABLE](#create-table)** - 创建新表

- **[ALTER TABLE](#alter-table)** - 变更（改变）数据库表

- **[TRUNCATE TABLE](#truncate-table)** - 清除表数据

- **[DROP TABLE](#drop-table)** - 删除表

- **[CREATE INDEX](#create-index)** - 创建索引（搜索键）

- **DROP INDEX** - 删除索引

------

- **[INSERT INTO](#insert-into)** - 向数据库中插入新数据
- **[SELECT](#select)** - 从数据库中选取数据
- **[SELECT DISTINCT](#select-distinct)** - 去除重复值
- **[WHERE](#where)** - 条件过滤
- **[UPDATE](#Update)** - 更新数据库中的数据
- **[DELETE](#delete)** - 从数据库中删除数据

- **[AND&OR 运算符](#and&or-运算符)** - 用于基于一个以上的条件对记录进行过滤。
- **[ORDER BY 排序](#order-by-排序)** - 用于对结果集进行排序。

> SQL 对大小写不敏感：SELECT 与 select 是相同的。但建议使用大写

### CREATE DATABASE

CREATE DATABASE 语句用于创建数据库。

```sql
CREATE DATABASE database_name;
```





### CREATE TABLE

CREATE TABLE 语句用于创建数据库中的表。

表由行和列组成，每个表都必须有个表名。

```sql
CREATE TABLE table_name
(
    column_name1 data_type(size),
    column_name2 data_type(size),
    column_name3 data_type(size),
    ....
);
```

参数说明：

- `column_name`：参数规定表中列的名称
- `data_type`：参数规定列的数据类型（例如 varchar、integer、decimal、date 等等）
- `size`：参数规定表中列的最大长度



### ALTER TABLE

ALTER TABLE 语句用于在已有的表中添加、删除或修改列。

如需在表中添加列，请使用下面的语法:

```sql
ALTER TABLE table_name
ADD column_name datatype;
```

如需删除表中的列，请使用下面的语法：

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

> 请注意，某些数据库系统不允许这种在数据库表中删除列的方式

### TRUNCATE TABLE

TRUNCATE TABLE 语句用于清除表内的数据（表的结构、属性以及索引仍存在）。

```sql
TRUNCATE TABLE table_name;
```

TRUNCATE 和 DELETE 都可以删除表的所有记录，但有原理不同。DELETE 的效率没有 TRUNCATE 高！

TRUNCATE 其实属性 DDL 语句，因为它是先 DROP TABLE，再 CREATE TABLE。

而且 TRUNCATE 删除的记录是无法回滚的，但 DELETE 删除的记录是可以回滚的（回滚是事务的知识！）

### DROP TABLE

DROP TABLE 语句用于删除表（表的结构、属性以及索引也会被删除）。

```sql
DROP TABLE table_name;
```

### CREATE INDEX

CREATE INDEX 语句用于在表中创建索引。

在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。

在表上创建一个简单的索引。允许使用重复的值：

```sql
CREATE INDEX index_name
ON table_name (column_name);
```

在表上创建一个唯一的索引。不允许使用重复的值：唯一的索引意味着两个行不能拥有相同的索引值

```sql
CREATE UNIQUE INDEX index_name
ON table_name (column_name);
```



### INSERT INTO

INSERT INTO 语句用于向表中插入新记录（新的行）。

有两种编写形式：

第一种形式无需指定要插入数据的列名，只需提供被插入的值即可：

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

第二种形式需要指定列名及被插入的值：

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

参数说明：

- `table_name`：需要插入新记录的表名
- `column1, column2, ...`：需要插入的字段名
- `value1, value2, ...`：需要插入的字段值



### SELECT

SELECT 语句用于从数据库中选取数据。

结果被存储在一个结果表中，称为结果集。

```sql
SELECT column1, column2, ...
FROM table_name;

/* 或 */
SELECT * FROM table_name;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `table_name`：要查询的表名称



### SELECT DISTINCT

在表中，一个列可能会包含多个重复值，有时您也许希望仅仅列出不同（distinct）的值。

DISTINCT 关键词用于返回唯一不同的值。

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `table_name`：要查询的表名称



### WHERE

WHERE 子句用于提取那些满足指定条件的记录。

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段。
- `table_name`：要查询的表名称。

下面的运算符可在 WHERE 子句中使用：

| 操作符  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| =       | 等于                                                         |
| <>      | 不等于，**📢 注意：** 在某些版本的 SQL 中，操作符 <> 可以写为 != |
| >       | 大于                                                         |
| <       | 小于                                                         |
| >=      | 大于等于                                                     |
| <=      | 小于等于                                                     |
| BETWEEN | 在某个范围内                                                 |
| LIKE    | 搜索某种模式                                                 |



### UPDATE

UPDATE 语句用于更新表中已存在的记录。

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

参数说明：

- `table_name`：要修改的表名称
- `column1, column2, ...`：要修改的字段名称，可以为多个字段
- `value1, value2, ...`：要修改的值，可以为多个值
- `condition`：修改条件，用于指定哪些数据要修改

> **📢 注意：** WHERE 子句规定哪条记录或者哪些记录需要更新，否则所有的记录都将被更新！





### DELETE

DELETE 语句用于删除表中的行。

```sql
DELETE FROM table_name
WHERE condition;
```

参数说明：

- `table_name`：要删除的表名称
- `condition`：删除条件，用于指定哪些数据要删除

> **📢 注意：** WHERE 子句规定哪条记录或者哪些记录需要删除，否则所有的记录都将被删除！

**删除所有行：**

可以在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的：

```sql
DELETE FROM table_name;
```



### AND&OR 运算符

AND & OR 运算符用于基于一个以上的条件对记录进行过滤。

如果第一个条件和第二个条件都成立，则 AND 运算符显示一条记录

```sql
SELECT * FROM 表名称 WHERE 列 运算符 值 AND 列 运算符 值;
```

如果第一个条件和第二个条件中只要有一个成立，则 OR 运算符显示一条记录

```sql
SELECT * FROM 表名称 WHERE 列 运算符 值 OR 列 运算符 值;
```

### ORDER BY 排序

ORDER BY 关键字用于对结果集按照一个列或者多个列进行排序。

ORDER BY 关键字默认按照升序对记录进行排序。如果需要降序排序，可以使用 DESC 关键字。

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

- `column1, column2, ...`：要排序的字段名称，可以为多个字段
- `ASC`：默认，升序排序
- `DESC`：降序排序





## :page_facing_up:参考

[参考文章](https://blog.csdn.net/m0_50546016/article/details/120070003)、[参考文章](https://blog.csdn.net/PILIpilipala/article/details/113798383)、[参考文章](https://www.cnblogs.com/geaozhang/p/6682952.html)



