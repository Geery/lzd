let id = 0
class Dep {
  constructor() {
    this.id = ++id // Dep的唯一标识
    this.subs = [] // 存储 Watcher
  }
  //数据收集依赖的主要方法，Dep.target 是一个 watcher 实例；
  depend() {
    Dep.target.addDep(this)
  }
  // 添加 watcher 到数组中，也就是添加依赖；
  addSub(watcher) {
   this.subs.push(watcher)
  }
  //属性在变化时会调用 notify 方法，通知每一个依赖进行更新
  notify() {    
    this.subs.forEach(watcher=>{
        watcher.update();
    })
  }
}
// Dep.target 用来记录 watcher 实例，是全局唯一的，主要作用是为了在收集依赖的过程中找到相应的 watcher。
Dep.target = null

export function pushTarget(watcher) {
  Dep.target = watcher
}

export function popTarget() {
  Dep.target = null
}
export default Dep
