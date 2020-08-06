<template>
  <div class="app-container">
    <div v-highlight>
      <div class="block">
        <h3>Vuex 使用</h3>
        <div class="warning">
            <p>集中式状态管理组件，可预测的方式管理状态</p>
            <p>1、state 状态、数据</p>
            <p>2、mutations 更改状态的函数</p>
            <p>3、actions 异步操作</p>
            <p>4、store 包含以上概念的容器</p>
        </div>
        <pre>
          <code class="javascript">
          安装：vue add vuex
          //步骤⼀：state保存应⽤状态
          export default new Vuex.store({
              //状态 - statestate保存应⽤状态
              state:{
                  count:0
              },
              //状态变更 mutations  ⽤于修改状态，
              mutations:{
                  add(state){
                      state.count++
                  }
              },
              //派生状态getter 类似于计算属性
              getters:{
                  doubleCounter(state){
                      return state.counter*2
                  }
              },
              //动作 - actions; 添加业务逻辑，类似于controller
              actions:{
                  add({commit}){
                      setTimeOut(()=>{
                          commit('add')
                      },1000)
                  }
              }
          })
          // 测试
          &lt;p @click="$store.commit('add')">counter: {{$store.state.counter}}&lt;/p>
          &lt;p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}&lt;/p>
         &lt;p>double：{$store.getters.doubleCounter}&lt;/p>
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>vuex原理解析实现</h3>
        <div class="tip">
          <p>需求分析</p>
          <p>实现⼀个插件：声明Store类，挂载$store</p>
          <p>1.创建响应式的state，保存mutations、actions和getters</p>
          <p>2.实现commit根据⽤户传⼊type执⾏对应mutation</p>
          <p>3.实现dispatch根据⽤户传⼊type执⾏对应action，同时传递上下⽂</p>
          <p>4.实现getters，按照getters定义对state做派⽣</p>
        </div>
      </div>
      <div class="block">
        <h3>初始化：Store声明、install实现，kvuex.js：</h3>
        <pre>
        <code class="javascript">
        let Vue;
        class Store {
            constructor(options = {}) {
                this._vm = new Vue({
                    data: {
                        $$state:options.state
                      }
                });
            }
            get state() {
              return this._vm._data.$$state
            }
            set state(v) {
              console.error('please use replaceState to reset state');
            }
        }
        function install(_Vue) {
            Vue = _Vue;
            Vue.mixin({
                beforeCreate() {
                    if (this.$options.store) {
                        Vue.prototype.$store = this.$options.store;
                    }  
                }
            });
        }
        export default { Store, install };
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>实现commit：根据⽤户传⼊type获取并执⾏对应mutation</h3>
        <pre>
          <code class="javascript">
            class Store {
                constructor(options = {}) {
                    // 保存⽤户配置的mutations选项
                    this._mutations = options.mutations || {}
                }
                commit(type, payload) {
                    // 获取type对应的mutation
                    const entry = this._mutations[type]
                    if (!entry) {
                        console.error(`unknown mutation type: ${type}`);
                        return
                    }
                    // 指定上下⽂为Store实例
                    // 传递state给mutation
                    entry(this.state, payload);
                }
            }
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>实现actions：根据⽤户传⼊type获取并执⾏对应action</h3>
        <pre>
          <code class="javascript">
        class Store {
            constructor(options = {}) {
                // 保存⽤户编写的actions选项
                this._actions = options.actions || {}
                // 绑定commit上下⽂否则action中调⽤commit时可能出问题!!
                // 同时也把action绑了，因为action可以互调
                const store = this
                const {commit, action} = store
                this.commit = function boundCommit(type, payload) {
                    commit.call(store, type, payload)
                }
                this.action = function boundAction(type, payload) {
                return action.call(store, type, payload)
            }
            }
            dispatch(type, payload) {
                // 获取⽤户编写的type对应的action
                const entry = this._actions[type]
                if (!entry) {
                    console.error(`unknown action type: ${type}`);
                    return
                }
                // 异步结果处理常常需要返回Promise
                return entry(this, payload);
            }
        }
            </code>
        </pre>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
