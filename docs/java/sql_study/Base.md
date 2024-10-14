# SQL 基础

## :star:SQL 基本概念

### 是什么

SQL (Structured Query Language，结构化查询语言) 是用于管理**关系数据库管理系统**（RDBMS）。

> **RDBMS 指关系型数据库管理系统，全称 Relational Database Management System。**
>
> **RDBMS 是 SQL 的基础，同样也是所有现代数据库系统的基础。**
>
> **RDBMS 中的数据存储在被称为表的数据库对象中。**
>
> **表是相关的数据项的集合，它由列和行组成。**

SQL 的范围包括数据插入、查询、更新和删除，数据库模式创建和修改，以及数据访问控制。

### 能做什么

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



### 语法要求

- SQL 语句可以单行或多行书写，末端使用分号结尾
- 分号是在数据库系统中分隔每条 SQL 语句的标准方法
- 可以用空格和缩进来来增强语句的可读性
- 关键字不区别大小写，建议使用大写

在本文中，我们将在每条 SQL 语句的末端使用分号。



## :star:SQL 数据类型

下面列举一下常用数据类型：

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



## :star:SQL 语句分类

可以把 SQL 分为五大类型：

- <strong style="color:#DD5145">DDL（Data Definition Language，数据定义语言）</strong>：用来定义数据库对象：库、表、列等

  操作数据对象的语言，包括创建 create、删除 drop、修改 alter 、清除 truncate 数据库对象。

- <strong style="color:#DD5145">DML（Data Manipulation Language，数据操作语言）</strong>：用来操作数据库记录（数据）

  主要有增插 insert、更新 update、删除 delete 等操作表的语句。

  DML语句修改后数据将保持较好的一致性。

- <strong style="color:#DD5145">DQL（Data Query Language，数据查询语言）</strong>：用来查询数据库记录（数据）

  主要由于 select 关键字完成，查询语句是 SQL 语句中最复杂，功能最丰富的语句。

- <strong style="color:#DD5145">DCL（Data Control Language，数据控制语言）</strong>：用来管理数据库，例如用户访问权限和安全级别

  主要有 grant (授予)、revoke (撤销) 语句。

- <strong style="color:#DD5145">事务控制语句</strong>：主要有 commit、rollback 和 savepoint 三个关键字完成



## :star:DDL 数据定义语言

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



- **[WHERE](#where)** - 条件过滤
- **[UPDATE](#Update)** - 更新数据库中的数据
- **[DELETE](#delete)** - 从数据库中删除数据

- **[AND&OR 运算符](#and&or-运算符)** - 用于基于一个以上的条件对记录进行过滤。
- **[ORDER BY 排序](#order-by-排序)** - 用于对结果集进行排序。

> SQL 对大小写不敏感：SELECT 与 select 是相同的。但建议使用大写

### CREATE DATABASE

CREATE DATABASE 语句用于**创建数据库**。

```sql
CREATE DATABASE database_name;
# 当数据库名是关键字时，为了避免关键字，可以使用反引号解决
CREATE DATABASE `CREATE`;

# 完全版
CREATE DATABASE [IF NOT EXISTS] database_name
	[CHARACTER SET utf8][, COLLATE utf8_general_ci][, ENGINE INNODB];
```

- character set：指定数据库采用的字符集，如果不指定字符集，默认为`utf8`

- collate：指定数据库字符集的校对规则，常用的 `utf8_bin (区分大小写)` 、 `utf8_general_ci (不区分大小写)`

  默认为`utf8_general_ci`
  
- engine：指定引擎，例如 `INNODB`

### SHOW 查看数据库

```sql
-- 查看数据库
SHOW DATABASES;
-- 查看数据库创建的定义信息
SHOW CREATE DATABASE db_name;
```



### USE 选择数据库

MySQL中切换数据库：

```sql
USE database_name;
```



### DROP DATABASE

DROP DATABASE 语句用于**删除数据库**。

```sql
-- 删除数据库(一定要慎用)
DROP DATABASE [IF EXISTS] db_name;
```



### CREATE TABLE

CREATE TABLE 语句用于**创建数据库中的表**。

表由行和列组成，每个表都必须有个表名。

```sql
CREATE TABLE table_name(
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



### DESC 查看表结构

```sql
DESC table_name;
```



### ALTER TABLE

ALTER TABLE 语句用于**在已有的数据表中添加、修改或删除列**。

如需在表中**添加列**，请使用下面的语法:

```sql
ALTER TABLE table_name ADD (
    column_name datatype NOT NULL DEFAULT '',
    column_name datatype ...
);
```

> `NOT NULL DEFAULT ''`，表示不允许为空，默认为一个空字符

如需在表中**修改列**，请使用下面的语法:

```sql
-- 修改列的类型
ALTER TABLE table_name MODIFY (
    column_name data_type(new_size),
    column_name data_type(new_size) ...
);

-- 修改列名
ALTER TABLE table_name
	CHANGE column_name new_column_name datatype NOT NULL DEFAULT '';
```

如需在表中的**删除列**，请使用下面的语法：

```sql
-- 查看表的结构，查看表所有的列
desc 表名;

ALTER TABLE table_name DROP (column_name, column_name ...);
```

> 请注意，某些数据库系统不允许这种在数据库表中删除列的方式

修改表名：

```sql
ALTER TABLE 表名 RENAME TO 新表名;
-- 或
RENAME TABLE 表名 TO 新表名;
```

修改表字符集：

```sql
ALTER TABLE 表名 CHARACTER SET 字符集;
```

修改存储引擎

```sql
ALTER TABLE `表名` ENGINE = 引擎;
```



### DROP TABLE

DROP TABLE 语句用于**删除表（表的结构、属性以及索引也会被删除）**。

```sql
DROP TABLE table_name;
```



### TRUNCATE TABLE

TRUNCATE TABLE 语句用于**清除表内的数据（表的结构、属性以及索引仍存在）**。

```sql
TRUNCATE TABLE table_name;
```

> TRUNCATE 和 DELETE 都可以删除表的所有记录，但有原理不同。DELETE 的效率没有 TRUNCATE 高！
>
> TRUNCATE 其实属性 DDL 语句，因为它是先 DROP TABLE，再 CREATE TABLE。
>
> 而且 TRUNCATE 删除的记录是无法回滚的，但 DELETE 删除的记录是可以回滚的（回滚是事务的知识！）
>



### CREATE INDEX 索引

CREATE INDEX 语句用于在表中创建索引。(**索引本身会占用空间**)

在不读取整个表的情况下，**索引使数据库应用程序可以更快地查找数据**。

在表上创建一个简单的索引。允许使用重复的值：

```sql
CREATE INDEX index_name ON table_name (column_name);
```

在表上创建一个唯一的索引。不允许使用重复的值：唯一的索引意味着两个行不能拥有相同的索引值

```sql
CREATE UNIQUE INDEX index_name ON table_name (column_name);
```





## :star:DML 数据操作语言

- **[INSERT INTO](#insert-into)** - 向数据库中插入新数据
- **[UPDATE](#update)** - 更新数据库中的数据
- **[DELETE](#delete)** - 从数据库中删除数据



### 🌟INSERT INTO

INSERT INTO 语句用于**向表中插入新记录（新的行）**。

- 给表中的所有字段添加数据，则无需指定要插入数据的列名，只需提供被插入的值即可：

```sql
INSERT INTO table_name
	VALUES (value1, value2, value3, ...);
```

- 需要指定列名及被插入的值：

```sql
INSERT INTO table_name (column1, column2, column3, ...)
	VALUES (value1, value2, value3, ...);
```

参数说明：

- `table_name`：需要插入新记录的表名
- `column1, column2, ...`：需要插入的字段名
- `value1, value2, ...`：需要插入的字段值

**注意细节：**

- 插入的数据应该与字段的数据类型相同
- 在`values`中列的数据位置必须与被加入列的位置一一对应
- 数据的长度应在列的范围内
- 字符和日期型数据应该包含在单引号中
- 列可以插入空值（前提是该字段允许为空），`insert into table values(null)`
- 如果是给表中的所有字段添加数据，可以不写前面的字段名称
- 默认值的使用，当不给某个字段值时，如果有默认值就会添加默认值，否则报错



### INSERT INTO SELECT

INSERT INTO SELECT 语句从一个表复制数据，然后把数据插入到一个已存在的表中。目标表中任何已存在的行都不会受影响。

我们可以从一个表中复制所有的列插入到另一个已存在的表中：

```sql
INSERT INTO table2
	SELECT * FROM table1;
```

或者我们可以只复制指定的列插入到另一个已存在的表中：

```sql
INSERT INTO table2
	(column_name(s))
	SELECT column_name(s) FROM table1;
```



### 🌟UPDATE

UPDATE 语句用于**更新表中已存在的记录（数据）**。

```sql
UPDATE table_name
	SET column1 = value1, column2 = value2, ...
	WHERE condition;

-- 慎重使用没有带where的语句
```

> **📢 注意：** WHERE 子句规定哪条记录或者哪些记录需要更新，否则所有的记录都将被更新！

参数说明：

- `table_name`：要修改的表名称
- `column1, column2, ...`：要修改的字段名称，可以为多个字段
- `value1, value2, ...`：要修改的值，可以为多个值
- `condition`：修改条件，用于指定哪些数据要修改



### 🌟DELETE

DELETE 语句用于**删除表中的记录（行）**。

```sql
DELETE FROM table_name
	WHERE condition;
-- 慎重使用没有带where的语句
```

> **📢 注意：** WHERE 子句规定哪条记录或者哪些记录需要删除，否则所有的记录都将被删除！

参数说明：

- `table_name`：要删除的表名称
- `condition`：删除条件，用于指定哪些数据要删除

**删除所有行：**

可以在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的：

```sql
DELETE FROM table_name;
```





## :star:DQL 数据查询语言

- **[SELECT](#select)** - 从数据库中选取数据
- **[SELECT DISTINCT](#select-distinct)** - 去除重复值



### 🌟SELECT（单表）

SELECT 语句用于**从数据库中选取（查询）数据**。

结果被存储在一个结果表中，称为结果集。

```sql
SELECT column1, column2, ...
	FROM table_name;

-- 或查询所有信息
SELECT * FROM table_name;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `form`：指定查询的是哪一张表
- `table_name`：要查询的表名称



### SELECT DISTINCT

在表中，一个列可能会包含多个重复值，有时您也许希望仅仅列出不同（distinct）的值。

DISTINCT 关键词用于**返回唯一不同的值**。

```sql
SELECT DISTINCT column1, column2, ...
	FROM table_name;
```





### WHERE 条件过滤

WHERE 子句用于**提取那些满足指定条件的记录**。

```sql
SELECT column1, column2, ...
	FROM table_name
	WHERE condition;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段。
- `table_name`：要查询的表名称。

**在 WHERE 子句中经常使用的运算符：**

|                | 操作符                    | 描述                                     |
| -------------- | ------------------------- | ---------------------------------------- |
| **比较运算符** | \>，<，<=，>=，=，<> / != | 大于、小于、大于(小于)等于、等于、不等于 |
|                | BETWEEN ... AND ...       | 显示在某一区间的值                       |
|                | IN(set)                   | 锁定多个值，例，in(100, 200)             |
|                | LIKE '张pattern'          | 模糊查询                                 |
|                | NOT LIKE  ' '             | 模糊查询                                 |
|                | IS NULL                   | 判断是否为空                             |
| **逻辑运算符** | and、or、not              |                                          |



### AND & OR 运算符

AND & OR 运算符用于基于一个以上的条件对记录进行过滤。

如果第一个条件和第二个条件都成立，则 AND 运算符显示一条记录

```sql
SELECT * FROM table_name
	WHERE column1 运算符 value1 AND column2 运算符 value2;
```

如果第一个条件和第二个条件中只要有一个成立，则 OR 运算符显示一条记录

```sql
SELECT * FROM table_name
	WHERE column1 运算符 value1 OR column2 运算符 value2;
```



### ------查询增强------

如果 SELECT 语句中同时包含，它们的执行顺序为 **group by，having，order by，limit**。



### GROUP BY  分组

GROUP BY 子句用于**结合聚合函数，根据一个或多个列对结果集进行 分组**。

```sql
SELECT column_name, aggregate_function(column_name) 
	FROM table_name
	WHERE column_name operator value
	GROUP BY column_name;
```

- `GROUP BY column_name`：按照 `column_name`来分组查询

### HAVING 分组过滤

在 SQL 中增加 HAVING 子句原因是，**WHERE 关键字无法与聚合函数一起使用**。

HAVING 子句用于**对 GROUP BY 分组后的结果进行 过滤**。

```sql
SELECT column_name, aggregate_function(column_name)
	FROM table_name
	WHERE column_name operator value
	GROUP BY column_name
	HAVING aggregate_function(column_name) operator value;
```



### ORDER BY 排序

ORDER BY 关键字**用于对结果集按照一个列或者多个列进行排序**。

默认按照升序 ASC 对记录进行排序。如果需要降序排序，可以使用 DESC 关键字。

```sql
SELECT column1, column2, ...
	FROM table_name
	ORDER BY column1, column2, ... ASC;

-- 还可以先安装列1升序，再按照列2降序
SELECT column1, column2, ...
	FROM table_name
	ORDER BY column1 ASC, column2 DESC;
```

- `column1, column2, ...`：要排序的字段名称，可以为多个字段
- `ASC`：默认，升序排序
- `DESC`：降序排序

> asc是 ascend (上升) 的缩写，desc是 descend (下降) 的缩写。



### LIMIT 限制（分页）

limit 子句**用于限制查询结果返回的数量，常用于分页查询**。

```sql
SELECT * FROM table_name LIMIT idx, num;
```

- table_name：为数据表
- idx：为查询结果的索引值（默认从0开始）
- num：为查询结果返回的数量

MySQL 语法：

```sql
SELECT ... LIMIT `start`, rows;
-- limit 每页显示记录数 * (第几页 - 1), 每页显示记录数
```

表示从 start +1 行开始取，取出 rows 行，start 从0开始计算





### AS 别名

通过使用 SQL AS，**可以为表名称或列名称指定别名**。创建别名是为了让列名称的可读性更强。

列的 SQL 别名语法：

```sql
SELECT column_name 
	AS alias_name
	FROM table_name;
```

表的 SQL 别名语法：

```sql
SELECT column_name(s)
	FROM table_name AS alias_name;
```



### LIKE 查找类似值

LIKE 操作符用于**在 WHERE 子句中搜索列中的指定模式**。

```sql
SELECT column1, column2, ...
	FROM table_name
	WHERE column LIKE pattern;
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `table_name`：要查询的表名称
- `column`：要搜索的字段名称
- `pattern`：搜索模式

```sql
SELECT column1, column2, ...
	FROM table_name
	WHERE column LIKE '韩%';
	
-- 韩% 表示名字已韩开头的就可以
-- %韩% 代表带韩的都显示
```

> - <strong style="color:#DD5145">%：表示0到多个字符</strong> 
> - <strong style="color:#DD5145">\_：表示单个字符</strong> 



### IN 锁定多个值

IN 操作符**允许您在 WHERE 子句中规定多个值**。

```sql
SELECT column1, column2, ...
	FROM table_name
	WHERE column IN (value1, value2, ...);
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `table_name`：要查询的表名称
- `column`：要查询的字段名称
- `value1, value2, ...`：要查询的值，可以为多个值。



### BETWEEN 选取区间

BETWEEN 操作符选取介于两个值之间的数据范围内的值。这些值可以是数值、文本或者日期。

```sql
SELECT column1, column2, ...
	FROM table_name
	WHERE column BETWEEN value1 AND value2;

-- 是闭区间
```

参数说明：

- `column1, column2, ...`：要选择的字段名称，可以为多个。如果不指定字段名称，则会选择所有字段
- `table_name`：要查询的表名称
- `column`：要查询的字段名称
- `value1`：范围的起始值
- `value2`：范围的结束值



### UNION 合并结果集

SQL UNION 操作符**合并两个或多个 SELECT 语句的结果**。

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

**📢注意：** UNION 操作符**默认为选取不同的值**。

如果查询结果需要显示重复的值，请使用 `UNION ALL`。

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

**📢注意：** UNION 结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名。

## :star:DCL 数据控制语言

详见高级部分



## :star:CRUD 语句

- C (create)：INSERT，添加数据
- R (read)：SELECT，查找数据
- U (update)：UPDATE，更新数据
- D (delete)：DELETE，删除数据











## :page_facing_up:参考

[菜鸟教程](https://www.runoob.com/sql/sql-tutorial.html)、[W3school](https://www.w3school.com.cn/sql/index.asp)、[参考文章](https://blog.csdn.net/m0_50546016/article/details/120070003)、[参考文章](https://blog.csdn.net/PILIpilipala/article/details/113798383)、[参考文章](https://www.cnblogs.com/geaozhang/p/6682952.html)