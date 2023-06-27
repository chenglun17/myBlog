# TypeScript 进阶

## 面向对象

面向对象，对象是具体的，类是抽象的，通过类new出对象，由抽象到具体

最重要的一句就是：通过对象来操作事物就是面向对象，面向是个动词



## 类（class）

传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 `class`。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

### 类的概念

这里对类相关的概念做一个简单的介绍：

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- **封装**（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- **继承**（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- **多态**（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### 类的用法

我们先回顾一下 ES6 中类的用法，更详细的介绍可以参考 [ECMAScript 6 入门 - Class](http://es6.ruanyifeng.com/#docs/class)。

定义类：

```ts
class 类名 {
    属性名: 类型;
    
    constructor(参数: 类型) {
        this.属性名 = 参数;
    }
    
    方法名() {
        ...
    }
}
```

#### 1.实例属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例对象的时候，会自动调用构造函数。

```js
class Animal {
    name: string;
    age: number;
    // 构造函数
    constructor(name: string, age: number) {
        // this就是表示当前的实例对象，this可以表示当前调用方法的对象
        this.name = name;
        this.age = age
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}
let a = new Animal('Jerry', 8);
console.log(a); // Animal { name: 'Jerry', age: 8 }
console.log(a.sayHi()); // My name is Jerry
```



#### 2.静态属性和方法

使用 `static` 修饰的属性或方法称为静态属性或静态方法，它们不需要实例化，而是直接通过类来调用：

```js
class Animal {
    static myName = 'Animal类的名字';
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jerry');
Animal.myName; // Animal类的名字
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```



### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

如果在子类中添加了和父类相同的方法，则子类方法会覆盖掉父类的方法，称为<strong style="color:#DD5145">方法重写</strong>。

```js
class Cat extends Animal {
    constructor(name: string, age: number){
        super(name, age);
        console.log(this.name);
    }
    sayHi() {
        return 'Hello,' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Hello, My name is Tom
```

子类的构造函数必须执行一次`super()`函数。



### 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```js
class Animal {
    private _name: string
    private _age: number

    constructor(name: string, age: number) {
        this._name = name
        this._age = age
    }

    // TS中设置getter方法
    get name() {
        console.log('get name() 执行了！')
        return this._name
    }
    // TS中设置setter方法
    set name(value) {
        console.log('set name() 执行了！')
        this._name = value
    }

    get age() {
        return this._age
    }
    set age(value) {
        if (value >= 0) {
            this._age = value
        }
    }
}
let a = new Animal('Jerry', 8)
console.log(a.name) // Jerry
a.name = 'Tom'
console.log(a.name) // Tom
a.age = 10
console.log(a.age) // 10
```



## 抽象类（abstract）

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

- 首先，抽象类是不允许被实例化的
- 其次，抽象类中的抽象方法必须被子类实现，即必须被继承

定义一个抽象方法：

- 抽象类中可以添加抽象方法，使用`abstract`开头，**没有方法体**
- 抽象方法只能定义在抽象类中，子类必须对抽象方法进行**重写**

当你不希望这个类能被实例化的时候，你就可以将它定义为抽象类：

```ts
abstract class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract sayHi(): void
}

class Cat extends Animal {
    sayHi() {
        console.log('hello')
    }
}

let a = new Animal('Jerry');
// index.ts:15:9 - error TS2511: Cannot create an instance of an abstract class.
let c = new Cat('Tom');
```

上面的例子中，我们定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。在实例化抽象类的时候报错了。



## 接口（inferface）

在面向对象语言中，接口（Interfaces）是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

即接口（interface）用来定义一个类结构，定义一个类中应该包含哪些属性和方法，同时也可以当成类型声明去使用。

- 接口可以在定义类的时候去限制类的结构
- 接口只定义对象的结构，不考虑实际值
- 在接口所有的属性都不能有实际的值
- 在接口中所有的方法都是抽象方法

实现（implements）是面向对象中的一个重要概念。一般，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

### 类实现接口

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

```ts
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```

一个类可以实现多个接口：

```ts
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

上例中，`Car` 实现了 `Alarm` 和 `Light` 接口，既能报警，也能开关车灯。

### 接口继承接口

接口与接口之间可以是继承关系：

```ts
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}
```

这很好理解，`LightableAlarm` 继承了 `Alarm`，除了拥有 `alert` 方法之外，还拥有两个新方法 `lightOn` 和 `lightOff`。

### 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：





## 访问修饰符

TypeScript 可以使用三种**访问修饰符（Access Modifiers）**，分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问，可以通过类中添加方法使得私有属性可以被外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是**它在子类中也是允许被访问的**

```ts
class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jerry');
console.log(a.name); // Jerry
a.name = 'Tom';
console.log(a.name); // Tom
```

### 参数属性

修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

```ts
class Animal {
    // public name: string;
    public constructor(public name) {
        // this.name = name;
    }
}
```

### readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

```ts
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jerry');
console.log(a.name); // Jerry
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```ts
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        // this.name = name;
    }
}
```



## 泛型（Generics）

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```ts
function fn<T>(a: T): T {
    return a;
}

fn(10);				// 不指定泛型，TS会自动对类型进行推断
fn<string>('hello');	// 指定泛型
```

> 我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型。

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}
// index.ts:2:21 - error TS2339: Property 'length' does not exist on type 'T'.
```

> 上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这个时候，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity(7)
// index.ts:10:17 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity([1, 2, 3])
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

但是，如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段还是会报错。

### 泛型接口



### 泛型类