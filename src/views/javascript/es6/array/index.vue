
<template>
  <div class="app-container">
    <div v-highlight>
      <h3>属性的简洁写法</h3>
      <pre>
            <code class="javascript">
                let name="jerry"

               输出：{name}  // 等效于 {name:"jerry"}
            </code>
      </pre>
    
      <div class="warning">
        <p>注意，简写的对象方法不能用作构造函数，会报错。</p>
      </div>
      <pre>
            <code class="javascript">
              let people ={
                    student:function(){}
                }
              new people.student()  // student {}  这种方式可以

            -------------------------------------对比----------------------------------------------

              let peoples ={
                    student(){}
                }
              new peoples.student() // Uncaught TypeError: peoples.student is not a constructor

            </code>
      </pre>
      
    </div>
  </div>
</template>

<script>
import DlPromise from '../promise'
export default {
  data() {
    return {};
  },
  created() {
    let dpm =new DlPromise((resolve,reject)=>{
     resolve('3')
    })
     console.log(dpm)
    // dpm.then(res=>{
    //   console.log(res)
    // })

    // let pm =new Promise((resolve,reject)=>{
    //   resolve('3')
    // })
    // console.log(pm)
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.app-container {
  .tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
  }
  .warning {
    padding: 8px 16px;
    background-color: #fff6f7;
    border-radius: 4px;
    border-left: 5px solid #fe6c6f;
    margin: 20px 0;
    code {
      background-color: hsla(0, 0%, 100%, 0.7);
      color: #445368;
    }
  }
  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  a {
    color: #50bfff;
    text-decoration: #50bfff;
  }
}
</style>
