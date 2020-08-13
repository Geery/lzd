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
// // 定义Promise的三种状态常量
// const PENDING = 'pending'
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'

// class DlPromise {
//   constructor(cb) {
//     if (!isFunction(cb)) {
//       throw new Error('DlPromise must accept a function as a parameter')
//     }
//     this._state = PENDING
//     this._result = null
//     this.callbacks = []
//     try {
//       cb(this._resolve.bind(this), this._reject.bind(this))
//     } catch (err) {
//       this._reject(err)
//     }
//   }
//   _transition(state, result) {
//     if (this._state !== PENDING) return
//     this._state = state
//     this._result = result
//     setTimeout(() => {
//         this._handleCallback()
//     }, 0);
//   }

//   _handleCallbacks(){
//     //   while(this.callbacks.length) {this._handleCallback(this.callbacks.shift())}
//   }

//   _onFulFilled = value => {
//     this._transition(FULFILLED, value)
//   }

//   _onRejected = reason => {
//     this._transition(REJECTED, reason)
//   }

//   _resolve(value) {
//     this._resolvePromise(value)
//   }

//   _reject(err) {
//     this._resolvePromise(err)
//   }

//   _resolvePromise(result) {
//     if (result === this) {
//       let reason = new TypeError('Can not fulfill promise with itself')
//       return this._reject(reason)
//     }
//     if (isPromise(result)) {
//       return result.then(this._onFulFilled, this._reject)
//     }
//     if (isThenable(result)) {
//       try {
//         let then = result.then
//         if (isFunction(then)) {
//           return new DlPromise(then.bind(result)).then(this._onFulFilled, this._reject)
//         }
//       } catch (error) {
//         return this._reject(error)
//       }
//     }
//     this._onFulFilled(result)
//   }

//   //promise 必须有 then 方法，接受 onFulfilled 和 onRejected 参数。
//   //onFulfilled 和 onRejected 如果是函数，必须最多执行一次。
//   //onFulfilled 的参数是 value，onRejected 函数的参数是 reason。
//   //then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。
//   //为 Promise 新增一个 callbacks 数组记录
//   then(onFulfilled, onRejected) {
//     return new DlPromise((resolve, reject) => {
//       let callback = {onFulfilled,onRejected,resolve,reject}
//       if (this._state === PENDING) {
//         this.callbacks.push(callback)
//       } else {
//         setTimeout(() => {
//           this._handleCallback(callback)
//         }, 0);
//       }
//     })
//   }

//   _handleCallback(callback) {
//     let {onFulfilled,onRejected,resolve,reject} = callback
//     try {
//       if (this._state === FULFILLED) {
//         isFunction(onFulfilled) ? resolve(onFulfilled(this._result)) : resolve(this._result)
//       } else if (this._state === REJECTED) {
//         isFunction(onRejected) ? resolve(onRejected(this._result)) : reject(this._result)
//       }
//     } catch (error) {
//       reject(error)
//     }
//   }
// }

// export default  DlPromise
class ZdPromise {
  constructor(executor) {
    executor
    if (!isFunction(executor)) {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    //初始化数据
    this.vulue = null //
    this.reason = null //拒因
    this.state = ZdPromise.PENDING
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }

  }
  resolve(result) {
    if (this.state === ZdPromise.PENDING) {
      this.state = ZdPromise.FULFILLED
      this.value = result
      this.fulfilledCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  reject(reason) {
    if (this.state === ZdPromise.PENDING) {
      this.state = ZdPromise.REJECTED
      this.reason = reason
      this.rejectedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  then(onFulfilled, onRejected) {
    // onResolved = typeof onResolved === 'function'? onResolved: value => value
    // onRejected = typeof onRejected === 'function'? onRejected: reason => {throw reason}
    //防止值的穿透 也就是.then(这里没写值).then(()=>{})
    if (!isFunction(onFulfilled)) {
      onFulfilled = function (value) {}
    }
    if (!isFunction(onRejected)) {
      onRejected = function (reason) {}
    }
    return new ZdPromise((resolve, reject) => {
      if (this.state === ZdPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
          } catch (e) {
            reject(e)
          }

        }, 0);
      }
      if (this.state === ZdPromise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }
      // 当resolve() 在定时器中的时候 这时候状态都是pending
      if (this.state === ZdPromise.PENDING) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })

  }

}
ZdPromise.PENDING = "pending"
ZdPromise.REJECTED = "rejected"
ZdPromise.FULFILLED = 'fulfilled'
ZdPromise.resolvePromise = function () {

}

new ZdPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 0);

}).then(res => {
  console.log('4')
}, err => {

}).then(res => {
  console.log(res)
})
// setTimeout(() => {
//   console.log('2.55')
// }, 0);
// console.log('3')
// new Promise((a,reject)=>{
//      ab
//     a(1)
// })
