// 1. 原型链继承
/* function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3];
}
function Child1() {
    this.type = 'child2';
}
Child1.prototype = new Parent1();
const c1 = new Child1()
console.log(c1.name); */
// 缺陷：实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化

// 2. 构造函数继承
/* function Parent2() {
    this.name = 'parent2';
}
Parent1.prototype.getName = function() {
    return this.name;
}
function Child2() {
    Parent2.call(this);
    this.type = 'child2';
}
let child = new Child2();
console.log(child);
// console.log(child.getName()) // 报错 */
// 缺陷：只能继承父类的实例属性和方法，不能继承原型属性或者方法

// 3. 组合继承(1 & 2组合)
/* function Parent3() {
    this.name = 'parent3';
    this.play = [1, 2, 3];
}
Parent3.prototype.getName = function() {
    return this.name;
}
function Child3() {
    // Parent3()
    Parent3.call(this);
    this.type = 'child3';
}
// Parent3()
Child3.prototype = new Parent3();
// 挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);
console.log(s3.getName());
console.log(s4.getName());
//缺陷：Parent3执行了两次，多构造一次就多进行了一次性能开销 */

// 普通对象继承
// 4. 原型式继承
/* let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};
let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");
let person5 = Object.create(parent4);
person5.friends.push("lucy");
console.log(person4.name);
console.log(person4.name === person4.getName());
console.log(person5.name);
console.log(person4.friends);
console.log(person5.friends);
// 缺陷；浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能 */

// 5. 寄生式继承

// 6. 寄生组合式继承

// 7. ES6 继承