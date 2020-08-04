let id = 0
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.id = ++id
    this.vm = vm
    this.cb = cb
    this.options = options
    //this.getter 存储的是更新视图的函数；
    this.getter = exprOrFn
    this.deps = []
    this.depIds = new Set()

    this.get()
  }
  run() {
    this.get()
  }
  get() {
    pushTarget(this)
    this.getter()
    popTarget(this)
  }
  //watcher 存储 dep，同时 dep 也存储 watcher，进行双向记录；
  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.depIds.push(dep.id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  update() {
    queueWatcher(this)
  }
}
