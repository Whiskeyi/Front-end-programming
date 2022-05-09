// call
Function.prototype._call = function(context) {
    // 判断调用对象
    if(typeof this !== "function") {
        console.error("type error")
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传入，如未传入则为window
    context = context || window;
    // 函数设为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
}

// apply
Function.prototype._apply = function(context) {
    // 判断调用对象
    if(typeof this !== "function") {
        console.error("type error")
    }
    let result = null;
    // 判断 context 是否传入，如未传入则为window
    context = context || window;
    // 函数设为对象的方法
    context.fn = this;
    // 调用方法
    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}

// bind
Function.prototype._bind = function(context) {
    // 判断调用对象
    if(typeof this !== "function") {
        console.error("type error")
    }
    // 获取参数
    var args = [...arguments].slice(1),
        fn = this;
    return function Fn() {
        // 根据调用方式，传入不同的绑定值
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}

