<template>
  <div class="app-container">
    <div v-highlight>
      <div class="block">
        <h3>父->子通信 props</h3>
        <pre>
          <code class="javascript">
            // parent.vue
            &lt;HelloWorld msg="我要给儿子传值"/>
            // child.vue
            props: { msg: String }  //props: Object | Array
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>子->父通信 $emit $on</h3>
        <pre>
          <code class="javascript">
            // parent.vue
            &lt;HelloWorld @say="sayHi($event)"/>
            // child.vue
            this.$emit('say', 'hi')
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>事件总线</h3>
        <div class="warning">
          <p>任意两个组件之间传值常⽤事件总线 或 vuex的⽅式。</p>
        </div>

        <pre>
          <code class="javascript">
            // Bus：事件派发、监听和回调管理
            class Bus {
              constructor(){
                this.callbacks = {}
              }
              $on(name, fn){
                this.callbacks[name] = this.callbacks[name] || []
                this.callbacks[name].push(fn)
              }
              $emit(name, args){
                if(this.callbacks[name]){
                  this.callbacks[name].forEach(cb => cb(args))
                }
              }
            }
            // main.js
            Vue.prototype.$bus = new Bus()
            // child1
            this.$bus.$on('foo', handle)
            // child2
            this.$bus.$emit('foo')
          </code>
        </pre>
      </div>
      <div class="block">
        <h3>兄弟间组件通信 $parent/$root</h3>
        <div class="tip">
          <p>兄弟组件之间通信可通过共同祖辈(中间人)搭桥，$parent或$root。</p>
        </div>
        <pre>
        <code class="javascript">
          //brother2 -> brother1
          // brother1
          this.$parent.$on('foo', handle)
          // brother2
          this.$parent.$emit('foo')
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>$children 与 $refs</h3>
        <div class="tip">
          <p>⽗组件可以通过$children访问⼦组件实现⽗⼦通信。</p>
          <p>获取⼦节点引⽤</p>
          <p>和$refs的区别就是：$children不能保证⼦元素顺序</p>
        </div>
        <pre>
        <code class="javascript">
          // parent
          this.$children[0].xx = 'xxx'
          // parent
          &lt;HelloWorld ref="hw"/&gt;
          mounted() {
            this.$refs.hw.xx = 'xxx'
          }
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>$attrs/$listeners</h3>
        <div class="tip">
          <p>
            包含了⽗作⽤域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。
            当⼀个组件没有声明任何 prop 时，这⾥会包含所有⽗作⽤域的绑定 (class 和 style 除外)，
            并且可以通过 v-bind="$attrs"(当下一层级还需要用到的时候,这种方式可以实现透传) 传⼊内部组件——在创建⾼级别的组件时⾮常有⽤。
          </p>
        </div>
        <pre>
        <code class="html">
          // child：并未在props中声明foo
           &lt;p&gt;{{$attrs.foo}}&lt;/p&gt;
          // parent
           &lt;HelloWorld foo="foo"/&gt;
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>provide/inject</h3>
        <div class="tip">
          <p>能够实现祖先和后代之间传值</p>
        </div>
        <pre>
        <code class="javascript">
        // ancestor
        provide() {
          return {foo: 'foo'}  // 注意是返回了一个对象和data的定义类似
        }
        // descendant
        inject: ['foo']
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>插槽</h3>
        <div class="tip">
          <p>插槽语法是Vue 实现的内容分发 API，⽤于复合组件开发。该技术在通⽤组件库开发中有⼤量应⽤</p>
        </div>
        <pre>
        <code class="html">
        // comp1.vue
        &lt;slot&gt;&lt;/slot&gt;
        // parent.vue
        &lt;comp&gt;hello&lt;/comp&gt;
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>具名插槽 name / v-slot</h3>
        <div class="tip">
          <p>将内容分发到⼦组件指定位置</p>
        </div>
        <pre>
        <code class="html">
          // comp2.vue
          &lt;div&gt;
            &lt;slot&gt;&lt;/slot&gt;
            &lt;slot name="content"&gt;&lt;/slot&gt;
          &lt;/div&gt;
          // parent.vue
          &lt;Comp2&gt;
          &lt;template v-slot:default>具名插槽&lt;/template&gt; // 默认插槽⽤default做参数 
          &lt;template v-slot:content&gt;内容...&lt;/template&gt; //具名插槽⽤插槽名做参数
         &lt;/Comp2&gt;
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>作用域插槽 v-bind /v-slot:default="slotProps" / {slotProps.foo}</h3>
        <div class="tip">
          <p>将内容分发到⼦组件指定位置</p>
        </div>
        <pre>
        <code class="javascript">
          // comp2.vue
          &lt;div&gt;
            &lt;slot&gt;&lt;/slot&gt;
            &lt;slot :foo="foo"&gt;&lt;/slot&gt;
          &lt;/div&gt;
          // parent.vue
          &lt;Comp2&gt;
           &lt;template v-slot:default="slotProps">来⾃⼦组件数据：{slotProps.foo}&lt;/template&gt; // 把v-slot的值指定为作⽤域上下⽂对象 
         &lt;/Comp2&gt;
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>v-model 实现原理</h3>
        <div class="tip">
          <p>value 和input 组合实现的语法糖</p>
        </div>
        <pre>
        <code class="javascript">
             &lt;input :value="value" @input="onInput" v-bind="$attrs"&gt;
             export default {
              inheritAttrs: false,
              props: {
                value: {
                type: String,
                default: ''
                },
              },
              methods: {
                onInput(e) {
                  this.$emit('input', e.target.value)
                }
               },
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
