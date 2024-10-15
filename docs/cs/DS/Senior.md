# 高阶应用

## 1.线性表的高阶应用

### 顺序表

#### 1.顺序表的定义

数组静态分配

```c
#define MaxSize 50		//定义线性表的最大长度
typedef struct{
	ElemType data[MaxSize];	 //顺序表的元素
	int length;				//顺序表的当前长度
}SqList;					//顺序表的类型定义
```

数组动态分配

```c
#define MaxSize 100		//定义线性表的最大长度
typedef struct{
	ElemType *data;		 //指示动态分配数组的指针
	int MaxSize,length;	 //数组的最大容量和当前个数
}SqList;				//动态分配数组顺序表的类型定义
```

#### 2.顺序表的插入

```c
status ListInsert(SqList &L, int i, ElemType e){
	if(i < 1 || i > L.lenth+1)	//判断 i 的范围是否有效
        return false;
    if(L.lenth >= MaxSize)		//当前存储空间已满
        return false;
    for(int j = L.lenth; j >= i; j--)	//将第 i 个元素及之后的元素后移
        L.elem[j] = L.elem[j-1];
    L.data[i-1] = e;		 	 //在位置 i 处放入e
    L.lenth++;					//线性表长度加1
    return true;
}
```

#### 3.顺序表的删除

```c
status ListDelete(SqList &L, int i, ElemType &e){
    if(i < 1 || i > L.lenth+1)	//判断 i 的范围是否有效
        return false;
    e = L.data[i-1];		//将被删除的元赋值给 e
    for(int j = i; j < L.lenth; j++)	//将第 i 个位置后的元素前移
        L.data[j-1] = L.data[j];
    L.lenth--;				//线性表长度减 1
    return true;
}
```

#### 4.顺序表的查找

```c
status LocateElem(SqList L, ElemType e){
    int i;
    for(i=0; i < L.lenth; i++)
        if(L.data[i] == e)
            return i+1;		 //下标为 i 的元素值等于 e，返回其位序 i+1
    return 0;				//查找失败
}
```

### 单链表

#### 1. 单链表的定义

```c
typedef struct LNode{		//定义单链表结点类型
    ElemType data;			//数据域，该结点的权值
    struct LNode *next;		//指针域，next指向下一个结点
}LNode, *LinkList;
```

#### 2. 建立单链表（头插法）

```c
LinkList List_HeadInsert(LinkList &L){		//逆向建立单链表
	LNode *s; int x;
	L = (LinkList)malloc(sizeof(LNode));	//创建头结点
	L -> next == NULL;					//初始为空链表
	scanf("%d", &x);					//输入结点的值
	while(x! = 9999){					//输入9999表示结束
		s = (LNode*)malloc(sizeof(LNode));	//创建新结点
		s -> next = L -> next;
		L -> next = s;					//将新结点插入表中，L为头指针
		scanf("%d", &x);
	}
	return L;
}

//时间复杂度为 O(n)
```

#### 3. 建立单链表（尾插法）

```c
LinkList List_TailInsert(LinkList &L){		//正向建立单链表
	LNode *s, *r = L; int x;			  //设置元素类型为整型，r为表尾指针
	L = (LinkList)malloc(sizeof(LNode));	//创建头结点
	scanf("%d", &x);					//输入结点的值
	while(x! = 9999){					//输入9999表示结束
		s = (LNode*)malloc(sizeof(LNode));	//创建新结点
		s -> next = x;
		r -> next = s;					//r指向新的表尾结点
		scanf("%d", &x);
	}
    r -> next = NULL;					//尾结点指针置空
	return L;
}

//时间复杂度为 O(n)
```

#### 4. 按序号查找

```c
LNode *GetElem(LinkList L; int i){
	int j=1;				//计数，初始为1
    LNode *p = L->next;		 //第1个结点指针赋给p
    if(i = 0)
        return L;			//若i=0，则返回头结点
    if(i < 1)
        return NULL;		//若i无效，则返回NULL
    while(p && j < i){		//从第1个结点开始找，查找第i个结点
        p = p->next;
        j++;
    }
    return p;				//返回第i个结点的指针，若 i > 表长，则返回NULL
}

//时间复杂度为 O(n)
```

#### 5. 按值查找

```c
LNode *LocateElem(LinkList L,ElemType e){
	LNode *p = L->next;
    while(p != NULL && p-data != e)		//从第1个结点开始查找data域为e的结点
        p = p-next;
    return p;						  //找到后返回该结点指针，否则返回NULL
}

//时间复杂度为 O(n)
```

#### 6. 单链表的插入

```c
//按序号查找到插入位置的前驱结点 *p，将新结点 *s 插入到结点 *p 后

p = GetElem(L, i-1);	 //语句1
s->next = p-next;		 //语句2
p-next = s;				//语句3

//语句2和3的顺序不能颠倒，否则会丢失原后继的（指针）地址
```

#### 7. 单链表的删除

```c
//按序号查找到待删除位置的前驱结点 *p

p = GetElem(L, i-1);	 //语句1
q = p-next;		 		//语句2，用 q 临时存储待删除结点的地址
p-next = q-next;		//语句3，将 *q 结点从链中“断开”
free(p);			   //语句4,
```

### 双链表

#### 1. 双链表的定义

```c
typedef struct DNode{				//定义双链表结点类型
    ElemType data;					//数据域
    struct DNode *prior, *next;		 //前驱和后继指针
}DNode, *DLinkList;
```

#### 2. 双链表的插入

```c
//将结点 *s 插入到结点 *p 之后

s->next = p->next;		 //语句1
p->next->prior = s;		 //语句2
s->prior = p;			//语句3
p->next = s;			//语句4

//语句1和2必须在语句4之前，否则 *p 的后继结点的指针会丢失
```

```c
//将结点 *s 插入到结点 *p 之前

s->prior = p->prior;	 //语句1
p->prior->next= s;		 //语句2
s->next = p;			//语句3
p->prior = s;			//语句4

//语句1和2必须在语句4之前，否则 *p 的前驱结点的指针会丢失
```

#### 3.双链表的删除

```c
//删除结点 *p 的后继结点 *q

p->next = q-next;		//语句1
q->next->prior = p;		//语句2
free(q);			   //语句3
```

## 2.栈的高阶应用

### 顺序栈

栈的顺序存储类型定义

```c
typedef struct{
    Elemtype data[MaxSize];		  	  //存放栈中元素
    int top;						//栈顶指针
}SqStack;
```

初始化

```c
void InitStack(SqStack &S){
    S.top = -1;						//初始化栈顶指针
}
```

判断栈是否为空

```c
bool StackEmpty(SqStack S){
    if(S.top == -1)					//栈空的条件
        return true;
    else
        return false;
}
```

进栈

```c
bool Push(SqStack &S, ElemType x){
    if(S.top == MaxSize-1)			//栈满，则报错
        return false;
    S.data[++S.top] = x;			//指针先加 1，再入栈
    return true;
}
```

出栈

```c
bool Pop(SqStack &S, ElemType &x){
    if(S.top == -1)					//栈空，则报错
        return false;
    S.data[S.top--] = x;			//先出栈，指针再减 1
    return true;
}
```

读栈顶元素

```c
bool GetTop(SqStack S, ElemType &x){
    if(S.top == -1)					//栈空
        return true;
    x = S.data[S.top];				//x 记录栈顶元素
    return true;
}
```



### 链栈

栈的链式存储类型定义

```c
typedef struct Linknode{
    Elemtype data;		  	  			//数据域
    struct Linknode *next;				//指针域
} *LiStack;
```

链栈的操作与链表类似，入栈和出栈操作都在链表的表头进行

## 3.队列的高阶应用

### 顺序队列

队列的顺序存储类型定义

```c
tyepdef struct{
    ElemType data[MaxSize];				 //存放队列元素
    int front, rear;					//队头指针、队尾指针
}SqQueue;
```

初始化

```c
void InitQueue(SqQueue &Q){
    Q.rear = Q.front = 0;				//初始化队首、队尾指针
}
```

判断队列是否为空

```c
bool isEmpty(SqQueue Q){
    if(Q.rear == Q.front)				//队空的条件
        return true;
    else
        return false;
}
```

入队

```c
bool EnQueue(SqQueue &Q, ElemType x){
    if( (Q.rear+1) % MaxSize == Q.front )
        return false;					//队满，则报错
    Q.data[Q.rear] = x;
    Q.rear = (Q.rear + 1) % MaxSize;	 //队尾指针加 1 取模
    return true;
}
```

出队

```c
bool DeQueue(SqQueue &Q, ElemType &x){
    if(Q.rear == Q.front)
        return false;					//队空，则报错
    x = Q.data[Q.front];
    Q.front = (Q.front + 1) % MaxSize;	 //队头指针加 1 取模
    return true;
}
```

### 链式队列

=="头出尾插" 的单链表==

队列的l链式存储类型定义

```c
tyepdef struct LinkNode{				//链式队列结点
    ElemType data;
    struct LinkNode *next;
}LinkNode;

typedef struct{							//链式队列
    LinkNode *front, *rear;				 //队列的队头指针、队尾指针
}LinkQueue;
```

初始化

```c
void InitQueue(LinkQueue &Q){
    Q.front = Q.rear = (LinkNode*)malloc(sizeof(LinkNode));	//建立头结点
    Q.front->next = NULL;				//初始化为空
}
```

判断队列是否为空

```c
bool isEmpty(SqQueue Q){
    if(Q.front == Q.rear)				//队空的条件
        return true;
    else
        return false;
}
```

入队

```c
void EnQueue(SqQueue &Q, ElemType x){
    Q.front = Q.rear = (LinkNode*)malloc(sizeof(LinkNode));
    s->data = x ->next = NULL;			//创建新结点，插入到链尾（尾插法）
    Q.rear->next = s;
    Q.rear = s;
}
```

出队

```c
bool DeQueue(SqQueue &Q, ElemType &x){
    if(Q.front == Q.rear)
        return false;					//队空，则报错
    LinkNode *p = Q.front->next;		 //头出
    x = p->data;
    Q.front->next = p->next;
    if(Q.rear == p)
        Q.rear = Q.front;				//若原队列只有一个结点，删除后变为空
    free(p);
    return true;
}
```

