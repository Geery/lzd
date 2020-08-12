// new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('FULFILLED')
//     }, 1000)
//   })
// promise 有 3 个状态，分别是 pending, fulfilled 和 rejected。 
// 在 pending 状态，promise 可以切换到 fulfilled 或 rejected。
// 在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value。
// 在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason。

// 有 3 个常量 pending, fulfilled, rejected，
// 一个 Promise 构造函数，有 state 和 result 两个属性。
// 当 state 为 fulfilled 时，result 作为 value 看待。
// 当 state 为 rejected 时，result 作为 reason 看待。
// 一个 transition 状态迁移函数，它只会在 state 为 pending 时，进行状态迁移。

//定义方法
const isFunction = variable => typeof variable === 'function'
const isPromise = variable => variable instanceof DlPromise
const isThenable = variable => variable.then && typeof variable.then === 'function'
// 定义Promise的三种状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class DlPromise {
  constructor(cb) {
    if (!isFunction(cb)) {
      throw new Error('DlPromise must accept a function as a parameter')
    }
    this._state = PENDING
    this._result = null
    this.callbacks = []
    try {
      cb(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  _transition(state, result) {
    if (this._state !== PENDING) return
    this._state = state
    this._result = result
    setTimeout(() => {
        this._handleCallback()
    }, 0);
  }

  _handleCallbacks(){
    //   while(this.callbacks.length) {this._handleCallback(this.callbacks.shift())}
  }

  _onFulFilled = value => {
    this._transition(FULFILLED, value)
  }

  _onRejected = reason => {
    this._transition(REJECTED, reason)
  }

  _resolve(value) {
    this._resolvePromise(value)
  }

  _reject(err) {
    this._resolvePromise(err)
  }

  _resolvePromise(result) {
    if (result === this) {
      let reason = new TypeError('Can not fulfill promise with itself')
      return this._reject(reason)
    }
    if (isPromise(result)) {
      return result.then(this._onFulFilled, this._reject)
    }
    if (isThenable(result)) {
      try {
        let then = result.then
        if (isFunction(then)) {
          return new DlPromise(then.bind(result)).then(this._onFulFilled, this._reject)
        }
      } catch (error) {
        return this._reject(error)
      }
    }
    this._onFulFilled(result)
  }

  //promise 必须有 then 方法，接受 onFulfilled 和 onRejected 参数。
  //onFulfilled 和 onRejected 如果是函数，必须最多执行一次。
  //onFulfilled 的参数是 value，onRejected 函数的参数是 reason。
  //then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。
  //为 Promise 新增一个 callbacks 数组记录
  then(onFulfilled, onRejected) {
    return new DlPromise((resolve, reject) => {
      let callback = {onFulfilled,onRejected,resolve,reject}
      if (this._state === PENDING) {
        this.callbacks.push(callback)
      } else {
        setTimeout(() => {
          this._handleCallback(callback)
        }, 0);
      }
    })
  }

  _handleCallback(callback) {
    let {onFulfilled,onRejected,resolve,reject} = callback
    try {
      if (this._state === FULFILLED) {
        isFunction(onFulfilled) ? resolve(onFulfilled(this._result)) : resolve(this._result)
      } else if (this._state === REJECTED) {
        isFunction(onRejected) ? resolve(onRejected(this._result)) : reject(this._result)
      }
    } catch (error) {
      reject(error)
    }
  }
}

export default  DlPromise