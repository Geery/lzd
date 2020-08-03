import Vue from 'vue'

function create(component, props) {
  const vm = new Vue({
    render(h) {
      console.log(h(Component, {
        props
      }))
      return h(component, {
        props
      })
    }
  }).$mount()

  document.body.appendChild(vm.$el)
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp;
}

function createOther(component, props) {
  //使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
  //data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
  // 创建构造器
  //   var Profile = Vue.extend({
  //     template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  //     data: function () {
  //       return {
  //         firstName: 'Walter',
  //         lastName: 'White',
  //         alias: 'Heisenberg'
  //       }
  //     }
  //   })
  const Profile = Vue.extend(component)
  const vm = new Profile(props).$mount()
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp;
}
