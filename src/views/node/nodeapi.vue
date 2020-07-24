<template>
  <div class="app-container">
    <div v-highlight>
      <div class="tip">
        <p>
          node 相关Api
        </p>
      </div>
      <h3>Node - 文件系统fs</h3>

      <pre>
        <code class="javascript">
          const fs = require('fs')
          
          const file = fs.readFileSync('index.js') // 文件同步读取
          console.log(file.toString()) // 将buffer 转成 正常字符

          fs.readFile('index.js',(err,data)=>{ // 异步读取方法
               console.log(file.toString())
          })
        </code>
      </pre>

       <h3>Node - path路径系统</h3>

      <pre>
        <code class="javascript">
          const path = require('path')
          // path.resolve 拼接 
          // __dirname 当前文件所在系统
          path.resolve(__dirname,'./index') 
        </code>
      </pre>

      <h3>Node - Buffer</h3>

      <pre>
        <code class="javascript">
          const buff =Buffer.from('a') // 转换成16进制了
          const buf =Buffer.from('中国') // 转换成utf-8
          const bufe = Buffer.concat([buff,buf]).toString() // 连接
        </code>
      </pre>

      <h3>Node - http.js</h3>

      <pre>
        <code class="javascript">
          const http = require('http')
          const server = http.createServer((req,res)=>{
            // 实现静态服务器
            if (err) {
              response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf8' });
              response.end('500，服务器错误');
              return ;
            }
            const {url,method,headers} =req
            if(url==='/'&&method==='GET'){
              fs.readFile('index.html',(err,data)=>{
                res.statusCode =200
                res.setHeader('Content-Type','text/html')
                res.end(data)
              })
            }else if(url==='user'){
              res.writeHeader(200,{'Content-Type':'application/json'})
              res.end(JSON.stringify([{name:'jerry'}]))
            } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {//响应图片请求，05-http.js
              fs.createReadStream('.'+url).pipe(response);
          }

          })
          server.listen()

          
        </code>
      </pre>
      <!-- <div class="warning">
        <p></p>
      </div>-->
    </div>
  </div>
</template>

<script>
const fs =require('fs')
export default {
  data() {
    return {};
  },
  created() {

  },
  methods: {}
};
</script>
<style lang="scss" scoped>

</style>
