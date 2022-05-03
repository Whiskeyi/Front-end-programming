// 1. 初始化 class。
// 2. 定义三种状态类型。
// 3. 设置初始状态。
// 4. resolve / reject。
// 5. .then方法实现, promise 构造函数的入参(一个函数，函数接受两个参数，resolve， reject。new promise 的时候，就要执行这个函数，并且有任何错误都要被 reject 出去)。
// 6. 监听 status 改变(getter，setter)。
// 7. 继续处理 .then 方法。
// 8. resolvePromise 方法实现。
// 9. .catch 方法实现。
// 10. resolve, reject 静态方法实现。

// 定义三种状态类型
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 初始化 class
class MPromise {
    // 由于 .then 可以多个并且不一定立马调用(setTimeout)需要定义两个数组用来保存 FULFILLED、REJECTED回调的数组
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    // self 变量存值, 避免死循环
    _status = PENDING;

    constructor(fn) {
        // 初始状态, 实例（不同的实例有不同的状态）
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        // 初始化的时候执行这个函数, 处理报错可能
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(e) {
            this.reject(e);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        // 处理回调情况
        switch(newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                })
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason);
                })
                break;
            }
        }
    }

    resolve(value) {
        if(this.status === PENDING) {
            // 更新值, 更新 status
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if(this.status === PENDING) {
            // 更新值, 更新 status
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    then(onFulfilled, onRejected) {
        // 判断 onFulfilled，onRejected 是否为函数，如果是函数就直接使用，不是则返回value / reason(值透传)
        const realOnFulfilled = this.ifFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }
        const realOnRejected = this.ifFunction(onRejected) ? onRejected : (reason) => {
            return reason;
        }
        // 返回 promise
        const promise2 = new MPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                // 微任务队列
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            }
            const rejectedMicrotask = () => {
                // 微任务队列
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            }

            switch(this.status) {
                case FULFILLED: {
                    fulfilledMicrotask();
                    break;
                }
                case REJECTED: {
                    rejectedMicrotask();
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
                }
            }

        });
        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    resolvePromise(promise2, x, resolve, reject) {
        if(promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'));
        }
        if(x instanceof MPromise) {
            queueMicrotask(() => {
                x.then(
                    (y) => {
                        this.resolvePromise(promise2, y, resolve, reject);
                    },
                    reject
                )
            })
        } else if(typeof x === 'object' || this.isFunction(x)) {
            if(x === null) {
                return resolve(x);
            }

            let then = null;

            try {
                then = x.then;
            } catch(error) {
                return reject(error);
            }

            if(this.isFunction(then)) {
                // 只执行一次
                let called = false;
                try {
                    then.call(
                        x,
                        (y) => {
                            if(called) {
                                return;
                            }
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        (r) => {
                            if(called) {
                                return;
                            }
                            called = true;
                            reject(r);
                        }
                    )
                } catch(error) {
                    if(called) {
                        return;
                    }
                    reject(error);
                }
            } else {
                resolve(x);
            }
        } else {
            resolve(x);
        }
    }

    // 判断是否为函数
    ifFunction(param) {
        return typeof param === 'function'
    }
    // 静态方法
    static resolve(value) {
        if(value instanceof MPromise) {
            return value;
        }

        return new MPromise((resolve) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new MPromise((resolve, reject) => {
            reject(reason);
        })
    }
}
