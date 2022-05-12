const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(handle) {
    this._status = PENDING
    this._value = undefined
    //回调函数队列
    this._fulfilledQueues = []
    this._rejectedQueues = []
    //执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  // resolve时执行的函数
  _resolve(val) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = val
  }

  // reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return
    this._status = REJECTED
    this._value = err
  }

  // then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      //成功时执行的函数
      let fulfilled = value => {
        try {
          let res = onFulfilled(value);
          if (res instanceof MyPromise) {
            // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            onFulfilledNext(res)
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }
      //失败时执行的函数
      let rejected = error => {
        try {
          let res = onRejected(error);
          if (res instanceof MyPromise) {
            // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            onFulfilledNext(res)
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }
      switch (_status) {
        //状态为pending时将回调函数推入队列进行缓存
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        //状态改变时执行回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
}
