
<template>
  <div class="app-container">
    <div v-highlight>
      <div class="block">
        <h3>全局安装 不推荐</h3>
        <div class="warning">
          <p>全局安装webpack，这会将你项⽬中的webpack锁定到指定版本，造成不同的项⽬中因为webpack依赖不同版本⽽导致冲突，构建失败</p>
        </div>
        <pre>
        <code class="javascript">
        // 安装webpack V4+版本时，需要额外安装webpack-cli
        npm install webpack webpack-cli -g
        // 检查版本
        webpack -v
        // 卸载
        npm uninstall webpack webpack-cli -g
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>局部安装 推荐</h3>
        <div class="tip">
          <p>npm i -D webpack webpack-cli 局部安装更有利于管理</p>
        </div>
        <pre>
         <code class="javascript">
        // 安装最新的稳定版本
        npm i -D webpack
        // 安装指定版本
        npm i -D webpack@version
        // 安装最新的体验版本 可能包含bug,不要⽤于⽣产环境
        npm i -D webpack@beta
        // 安装webpack V4+版本时，需要额外安装webpack-cli
        npm i -D webpack-cli
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>检查安装</h3>
        <div class="tip">
          <p>检查是否安装成功。</p>
        </div>
        <pre>
        <code class="javascript">
        // command not found 默认在全局环境中查找
        webpack -v 
        // npx帮助我们在项⽬中的node_modules⾥查找webpack 
        npx webpack -v
        // 到当前的node_modules模块⾥指定
        ./node_modules/.bin/webpack -v
        webpack
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>webpack默认配置</h3>
        <div class="warning">
          <p>webpack默认⽀持JS模块和JSON模块,其他模块需要额外引用loader进行扩展</p>
          <p>⽀持CommonJS（require、module.exports） Es moudule（import 与 export） AMD等模块类型</p>
          <p>webpack4⽀持零配置使⽤,但是很弱，稍微复杂些的场景都需要额外扩展</p>
        </div>
      </div>
      <div class="block">
        <h3>准备构建 - 执行构建</h3>
        <div class="tip margin-b-20">
          <p>npm init -y 、 npm i -D webpack webpack-cli 、 npm install</p>
          <p>新建src文件夹</p>
          <p>新建src/index.js、src/index.json、src/other.js</p>
          <p>npx webpack 启动打包 | 修改package.json⽂件 ("scripts": {"dev": "webpack"}) 启动：npm run dev -- 原理就是通过shell脚本在node_modules/.bin⽬录下创建⼀个软链接。</p>
        </div>
        <pre>
        <code class="javascript">
        // src/index.json
        {
        "name": "JOSN"
        }
        // src/other.js
        export function add(n1, n2) {
            return n1 + n2;
        }
        // src/index.js
        const json = require("./index.json");//commonJS
        import { add } from "./other.js";//es module
        console.log(json, add(2, 3));
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>构建成功 - 默认配置</h3>
        <div class="tip">
          <p>⽬录下多出⼀个 dist ⽬录，⾥⾯有个 main.js ，这个⽂件是⼀个可执⾏的JavaScript⽂件，⾥⾯包含webpackBootstrap启动函数。</p>
          <p>如果没有人工创建webpack.config.js 那么会有一个默认的设置</p>
        </div>
        <pre>
        <code class="javascript">
        const path = require("path");
        module.exports = {
            entry: "./src/index.js", // 必填 webpack执⾏构建⼊⼝
            output: {
                filename: "main.js", // 将所有依赖的模块合并输出到main.js
                path: path.resolve(__dirname, "./dist")  // 输出⽂件的存放路径，必须是绝对路径
            }
        };
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
  methods: {},
};
</script>
