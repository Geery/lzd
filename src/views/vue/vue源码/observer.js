import {
  isObject
} from "util"
import {
  Object
} from "core-js"

// 数据观测
class Observe {
  constructor(data) {
    this.dep = new Dep()
    //为观测的属性添加 __ob__ 属性，它的值等于 this，即当前 Observe 的实例
    def(data, '__ob__', this)

    if (Array.isArray(data)) {
      // 为数组添加重写的数组方法，比如：push()；pop()；shift()；unshift()；splice()；sort()；reverse()。 等方法，重写目的是在调用这些方法时，进行更新渲染
      protoAugment(data, arrayMethods)

      // 观测数组内的数据，observe 内部会调用 new Observe，形成递归观测；
      this.observerArray(data)

    } else {

      //观测对象数据，defineReactive 为数据定义 get 和 set ，即数据劫持
      this.walk(data)
    }
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
  observerArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

export default Observe

export function observe() {
  if (!isObject(data)) {
    return
  }
  let ob;
  //观测过的数据都会被添加上 __ob__ 属性，通过判断该属性是否存在，防止重复观测；
  if (data.hasOwnProperty('__ob__') && data.__ob__ instanceof Observe) {
    ob = data.__ob__
  } else {
    // 3
    ob = new Observe(data)
  }
  return ob;
}

export function defineReactive(obj, key, value) {
  // 由于值可能是对象类型，这里需要调用 observe 进行递归观测；
  let childOb = observe(value)

  //这里的 dep 就是上面讲到的每一个属性都会有一个 dep，它是作为一个闭包的存在，负责收集依赖和通知更新；
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      //如果有watcher 存在的情况 就讲dep 和watcher关联
      //在初始化时，Dep.target 是组件的渲染 watcher，这里 dep.depend 收集的依赖就是这个 watcher，childOb.dep.depend 主要是为数组收集依赖
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      value = newValue
      //设置的新值可能是对象类型，需要对新值进行观测；
      childOb = observe(newVal)

      //值发生改变，dep.notify 通知 watcher 更新，这是我们改变数据后能够实时更新页面的触发点。
      dep.notify()
      return value

      //过上面的逻辑，也能得出为什么 Vue3.0 要使用 Proxy 代替 Object.defineProperty 了。
      //Object.defineProperty 只能对单个属性进行定义，如果属性是对象类型，还需要递归去观测，会很消耗性能。而 Proxy 是代理整个对象，只要属性发生变化就会触发回调。
    }
  })

}

export function protoAugment(data, arrayMethods) {
    data.__proto__ = arrayMethods
  }

//将数组的原型保存起来，因为重写的数组方法里，还是需要调用原生数组方法的；
  let arrayProto  =Array.prototype  

  //arrayMethods 是一个对象，用于保存重写的方法，这里使用 Object.create(arrayProto) 创建对象是为了使用者在调用非重写方法时，能够继承使用原生的方法；
  export let arrayMethods = Object.create(arrayProto)

  let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
  ]
  methods.forEach(method => {
    arrayMethods[method] = function(...args) {
      // 调用原生方法，存储返回值，用于设置重写函数的返回值
      let res = arrayProto[method].apply(this, args)
      let ob = this.__ob__
      let inserted = ''
      switch(method){
        case 'push':
        case 'unshift':
          inserted = args
          break;
        case 'splice':
          inserted = args.slice(2)
          break;
      }
      // inserted 存储新增的值，若 inserted 存在，对新值进行观测
      inserted && ob.observeArray(inserted)
      // ob.dep.notify 触发视图更新。
      ob.dep.notify()
      return res
    }
  })