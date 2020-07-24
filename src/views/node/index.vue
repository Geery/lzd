<template>
  <div class="app-container">
    <div v-highlight>
      <div class="tip">
        <p>
          关于笔记的问题： 推荐用
          <a href="https://www.processon.com">processon</a>
        </p>
      </div>
      <div class="tip">
        <p>
          常见的并发处理几种方式
          <code>多进程-C Apache</code>、
          <code>多线程-Jave</code> 、
          <code>异步IO-js</code>、
          <code>
            协程IO-lua
            <a href="https://studygolang.com/articles/13101" target="_blank">deno-go</a>-下一代node
          </code>、
        </p>
      </div>
      <h3>Node 模块引用 -采用的是cmd方式</h3>

      <pre>
              <code class="javascript">
                const os =require('os')
                const mem =os.freemem()/os.totalmem *100
                console.log(`CPU占用率：${mem}%`);
            </code>
      </pre>

       <h3>Node 模块引用第三方</h3>

      <pre>
            <code class="javascript">
            </code>
      </pre>
      <!-- <div class="warning">
        <p></p>
      </div>-->
      <!-- 使用指令 -->
      <pre>
            <code class="css"><!-- 声明什么类型的代码 -->
                [CSS]
                {
                    width:'100px'
                }
            </code>
            <code class="javascript">
                [javascript]
                var a = 123;
                var b = document.getElementById('tr')
            </code>
            <code class="html">
                [HTML]
                &lt;div&gt;&lt;/div&gt;<!-- html代码需要转义 -->
            </code>
        </pre>
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
