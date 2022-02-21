function multiFn(x, y, z) {
    console.log(x * y * z);
    return x * y * z
}

function curry(fn, args=[]) {
    return function() {
        let newArgs = args.concat(Array.prototype.slice.call(arguments))
        if (newArgs.length < fn.length) { // 假如：实参个数 < 形参个数
            return curry.call(this, fn, newArgs)
        } else {
            return fn.apply(this, newArgs)
        }
    }
}

/* // ES6 写法
const curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (arg2) => judge(...args, arg2) */

let multi = curry(multiFn)
multi(2, 3, 4)
multi(2)(3)(4)
multi(2, 3)(4)
multi(2)(3, 4)   // 以上结果都是 3，柯里化将参数拆开自由绑定，结果不变。
let seniorMulti = multi(2) // seniorMulti 可以多次使用
seniorMulti(3)(4) // 当我们觉得重复传递参数 2 总是冗余时，可以这样。
