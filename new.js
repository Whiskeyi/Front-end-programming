/* （1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象 */

function _new() {
    // 创建新对象
    let target = {};
    // ES6 解构，第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    // （原型连接）target 是 constructor 的实例
    target.__proto__ = constructor.prototype;
    // 执行构造函数，将属性和方法添加到创建的空对象上
    let result = constructor.apply(target, args);
    if(result && (typeof(result) == "object" || typeof(result) == "function")) {
        // 如果构造函数执行结构返回的是引用类型，则返回引用类型的对象
        return result;
    }
    // 值类型
    return target;
}