// 1. 单例模式
class Singleton {
    // 1. 构造器私有化，外部不能new
    private constructor(){}
    // 2. 本类内部创建对象实例化
    private static instance : Singleton = new Singleton();
    // 3. 提供一个公有的静态方法，返回实例对象
    public static getInstance() : Singleton {
        return this.instance;
    }
}
console.log(Singleton.getInstance(), 'Singleton');

// 2. 工厂模式
// 抽象产品接口
interface Product{}
// 具体产品一
class ConcreteProduct1 implements Product {
    constructor(){}
}
// 具体产品二
class ConcreteProduct2 implements Product {
    constructor(){}
}
// 简单工厂
class SimpleFactory {
    public static createProduct(type : number) : Product {
        let product = null;
        if (type === 1) {
            product = new ConcreteProduct1();
        } else if ( type === 2) {
            product = new ConcreteProduct2();
        }
        return product;
    }
}
// 使用
let product = SimpleFactory.createProduct(1);
console.log(product);

// 3. 原型模式
interface Prototype {
    clone():Prototype;
}
class Dog implements Prototype {
    public name: string;
    public birthYear: number;
    public sex: string;
    public presentYear: number;
    constructor() {
        this.name = "zcj";
        this.birthYear = 2000;
        this.sex = "男";
        this.presentYear = 2022;
    }
    public getDiscription(): string {
        return `名称${this.name},性别${this.sex},
        ${this.presentYear}年${this.presentYear - this.birthYear}岁了`
    }
    // 实现复制
    public clone(): Prototype {
        return Object.create(this);
    }
}
// 使用
const dog = new Dog();
console.log(dog.getDiscription());
dog.presentYear = 2020;
const dog1 = Object.create(dog);
console.log(dog1.getDiscription());

// 4. 适配器模式
// 类适配器
// 目标对象
interface Target {
    request() : void;
}
// 被适配者
class Adaptee {
    constructor() {}
    // 这是源角色，有自己的的业务逻辑
    public specificRequest() : void {}
}
// 适配器
class Adapter extends Adaptee implements Target {
    constructor() {
        super();
    }
    public request() : void {
        super.specificRequest();
    }
}

const target : Target = new Adapter();
target.request();

/* // 对象适配器
// 目标对象
interface Target {
    request() : void;
}
// 被适配者
class Adaptee {
    constructor() {}
    // 这是源角色，有自己的的业务逻辑
    public specificRequest() : void {}
}
// 适配器
class Adapter implements Target {
    private adaptee : Adaptee;
    constructor(adaptee : Adaptee) {
        this.adaptee = adaptee;
    }
    public request() : void {
        this.adaptee.specificRequest();
    }
}
// 使用
const target : Target = new Adapter(new Adaptee());
target.request(); */

/* // 接口适配器
interface Adaptee {
    operation1() : void;
    operation2() : void;
}

abstract class AbsAdapter implements Adaptee {
    public operation1() : void {}
    public operation2() : void {}
}

class UseClass extends AbsAdapter {
    public operation1() : void {}// 重写该类
} */

// 5. 桥接模式
// 实现接口角色
interface Implementor {
    doSomething() : void;
    doAnything() : void;
}
// 具体实现角色
class ConcreteImplementor1 implements Implementor {
    public doSomething() : void {
    }
    public doAnything() : void {
    }
}
class ConcreteImplementor2 implements Implementor {
    public doSomething() : void {
    }
    public doAnything() : void {
    }
}
// 抽象类
abstract class Abstraction {
    private imp : Implementor;
    constructor(imp : Implementor) {
        this.imp = imp;
    }
    // 自身的行为和属性
    public request() : void {
        this.imp.doSomething();
    }
}
// 具体抽象化角色
class RefinedAbstraction extends Abstraction {
    constructor(imp : Implementor) {
        super(imp);
    }
    public request() : void {
        // 自己写一些处理业务
        super.request();
    }
}
// 调用
// 定义一个实现化角色
const imp : Implementor = new ConcreteImplementor1();
// 定义一个抽象化角色
const abs : Abstraction = new RefinedAbstraction(imp);
// 执行上下文
abs.request();

// 6. 策略模式
interface Strategy {
    // 策略模式运算法则
    doSomething() : void;
}
class ConcreteStrategy1 implements Strategy {
    public doSomething() : void {
        console.log('使用的策略1');
    }
}
class ConcreteStrategy2 implements Strategy {
    public doSomething() : void {
        console.log('使用的策略2');
    }
}
class ContextofStrategy {
    private _strategy : Strategy;
    constructor(strategy : Strategy) {
        this._strategy = strategy;
    }
    set strategy(strategy : Strategy) {
        this._strategy = strategy;
    }
    //封装后的策略方法
    doOperation() : void {
        this._strategy.doSomething();
    }
}
function main() {
    const strategy1 : Strategy = new ConcreteStrategy1();
    const strategy2 : Strategy = new ConcreteStrategy2();
    const context : ContextofStrategy = new ContextofStrategy(strategy1);
    context.doOperation();
    context.strategy = strategy2;
    context.doOperation();
}

main();

// 7. 观察者模式
interface AbstractSubject {
    registerObserver(observer : Observer) : void;
    remove(observer : Observer) : void;
    notifyObservers() : void;
}
class ConcreteSubject implements AbstractSubject {
    private observers : Array<Observer>;
    constructor() {
        this.observers = [];
    }
    public registerObserver(observer : Observer) : void {
        this.observers.push(observer);
    };
    public remove(observer : Observer) : void {
        const observerIndex = this.observers.findIndex(value => {
            return value == observer;
        })

        observerIndex >= 0 && this.observers.splice(observerIndex, 1);
    };
    public notifyObservers() : void {
        this.observers.forEach(observer => observer.update())
    };
}
interface Observer {
    update() : void;
}
class ConcreteObserver1 implements Observer {
    public update() : void {
        console.log('已经执行更新操作1，值为');
    }
}
class ConcreteObserver2 implements Observer {
    public update() : void {
        console.log('已经执行更新操作2，值为');
    }
}
// function main() {
//     const subject : AbstractSubject = new ConcreteSubject();
//     const observer1 : Observer = new ConcreteObserver1();
//     const observer2 : Observer = new ConcreteObserver2();
//     subject.registerObserver(observer1);
//     subject.registerObserver(observer2);
//     subject.notifyObservers();
// }

// main();