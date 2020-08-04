<template>
  <div class="app-container">
    <div v-highlight>
      <div class="block">
        <h3>vue-router 使用</h3>
        <pre>
          <code class="javascript">
          安装： vue add router
          //步骤⼀：使⽤vue-router插件，router.js
          import Router from 'vue-router'
          Vue.use(Router)

          //步骤⼆：创建Router实例，router.js
          export default new Router({...})

          //步骤三：在根组件上添加该实例，main.js
          import router from './router'
          new Vue({
            router,
          }).$mount("#app");

          //步骤四：添加路由视图，App.vue
          &lt;router-view&gt;&lt;/router-view&gt;

          //导航
          &lt;router-link to="/"&gt;Home &lt;/router-link&gt;
          &lt;router-link to="/about"&gt;About &lt;/router-link&gt;
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>vue-router源码实现</h3>
        <div class="tip">
          <p>需求分析</p>
          <p>1.作为⼀个插件存在：实现VueRouter类和install⽅法</p>
          <p>2.实现两个全局组件：router-view⽤于显示匹配组件内容，router-link⽤于跳转</p>
          <p>3.监控url变化：监听hashchange或popstate事件</p>
          <p>4.响应最新url：创建⼀个响应式的属性current，当它改变时获取对应组件并显示</p>
        </div>
      </div>
      <div class="block">
        <h3>创建VueRouter类和install⽅法 --实现一个插件</h3>
        <div class="warning">
          <!-- <p>思考: Vue.mixin({beforeCreate(){}}),</p> -->
          <p>为什么要⽤混⼊⽅式写？主要原因是use代码在前，Router实例创建在后，⽽install逻辑⼜需要⽤到该实例</p>
        </div>
        <pre>
        <code class="javascript">
        let Vue; // 引⽤构造函数，VueRouter中要使⽤
        // 保存选项
        class VueRouter {
          constructor(options) {
            this.$options = options;
            }
          }
          // 插件：实现install⽅法，注册$router
          VueRouter.install = function(_Vue) {
          // 引⽤构造函数，VueRouter中要使⽤
          Vue = _Vue;

          // 任务1：挂载$router
          Vue.mixin({
            beforeCreate() {
              // 只有根组件拥有router选项
              if (this.$options.router) {
                // vm.$router
                Vue.prototype.$router = this.$options.router;
              }
            }
          });

          // 任务2：实现两个全局组件router-link和router-view
          Vue.component('router-link', Link)
          Vue.component('router-view', View)
        };
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>创建router-view和router-link</h3>
        <pre>
          <code class="javascript">
            //创建krouter-link.js
            export default {
              props: {
                to: String,
                required: true
              },
              render(h) {
                // return &lt;a href={'#'+this.to}>{this.$slots.default}&lt;/a>;
                return h('a', {
                    attrs: {
                    href: '#' + this.to
                  }
                }, [
                  this.$slots.default
                ])
              }
            }
            //krouter-view.js
            export default {
              render(h) {
              // 暂时先不渲染任何内容
              return h(null);
              }
            }
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>监控url变化</h3>
        <pre>
          <code class="javascript">
          class VueRouter {
            constructor(options) {
              // current应该是响应式的
              Vue.util.defineReactive(this, 'current', '/')
              // 定义响应式的属性current
              const initial = window.location.hash.slice(1) || '/'
              Vue.util.defineReactive(this, 'current', initial)
              // 监听hashchange事件
              window.addEventListener('hashchange', this.onHashChange.bind(this))
              window.addEventListener('load', this.onHashChange.bind(this))
            }

            onHashChange() {
              this.current = window.location.hash.slice(1)
            }
          }
          //动态获取对应组件，krouter-view.js
          export default {
            render(h) {
              // 动态获取对应组件
              let component = null;
              this.$router.$options.routes.forEach(route => {
              if (route.path === this.$router.current) {
                component = route.component
                }
              });
              return h(component);
            }
          }
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>提前处理路由表</h3>
        <pre>
          <code class="javascript">
            //提前处理路由表避免每次都循环
            class VueRouter {
              constructor(options) {
                // 缓存path和route映射关系
                this.routeMap = {}
                this.$options.routes.forEach(route => {
                this.routeMap[route.path] = route
                });
              }
            }
          //动态获取对应组件，krouter-view.js
          export default {
            render(h) {
              const {routeMap, current} = this.$router
              const component = routeMap[current] ? routeMap[current].component : null;
              return h(component);
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
