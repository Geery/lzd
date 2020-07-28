
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
          <p>不使⽤⾃定义配置⽂件： ⽐如webpackconfig.js，可以通过--config webpackconfig.js来指定webpack使⽤哪个配置⽂件来执⾏构建</p>
        </div>
        <pre>
        <code class="javascript">
        const path = require("path");
        module.exports = {
            entry: "./src/index.js", // 必填 webpack执⾏构建⼊⼝
            output: {
                filename: "main.js", // 将所有依赖的模块合并输出到main.js
                path: path.resolve(__dirname, "./dist")  // 输出⽂件的存放路径，必须是绝对路径
            },
            module: {
                rules: [
                //loader模块处理
                {
                test: /\.css$/,
                use: "style-loader"
                }
              ]
            },
            mode: "production", //打包环境,
            plugins: [new HtmlWebpackPlugin()] //插件配置
        };
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>entry</h3>
        <div class="tip">
          <p>指定webpack打包⼊⼝⽂件:Webpack 执⾏构建的第⼀步将从 Entry 开始，可抽象成输⼊</p>
        </div>
        <pre>
        <code class="javascript">
          //单⼊⼝ SPA，本质是个字符串
          entry:{
            main: './src/index.js'
          }
          ==相当于简写===
          entry:"./src/index.js"
          //多⼊⼝ entry是个对象
          entry:{
            index:"./src/index.js",
            login:"./src/login.js"
          }
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>output</h3>
        <div class="tip">
          <p>打包转换后的⽂件输出到磁盘位置:输出结果，在 Webpack 经过⼀系列处理并得出最终想要的代码后输出结果</p>
        </div>
        <pre>
        <code class="javascript">
        output: {
          filename: "bundle.js",//输出⽂件的名称
          path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
        },

        //多⼊⼝的处理
        output: {
          filename: "[name][chunkhash:8].js",//利⽤占位符，⽂件名称不要重复
          path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
        }
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>mode</h3>
        <div class="tip">
          <p>Mode⽤来指定当前的构建环境,（未设置默认开启production）设置mode可以⾃动触发webpack内置的函数，达到优化的效果</p>
          <p>设置： production，会将DefinePlugin 中的process.env.NODE_ENV的值设置为production,启用:SideEffectsFlagPlugin ...</p>
          <p>设置： development,会将DefinePlugin 中的process.env.NODE_ENV的值设置为development,启用:NameChunksPlugin ...</p>
          <p>设置： none,不做任何设置</p>
          <p>开发阶段的开启会有利于热更新的处理，识别哪个模块变化,⽣产阶段的开启会有帮助模块压缩，处理副作⽤等⼀些功能</p>
        </div>
      </div>
      <div class="block">
        <h3>module</h3>
        <div class="tip">
          <p>模块，在 Webpack ⾥⼀切皆模块，⼀个模块对应着⼀个⽂件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。</p>
          <p>当webpack处理到不认识的模块时，需要在webpack中的module处进⾏配置，当检测到是什么格式的模块，使⽤什么loader来处理</p>
        </div>
        <pre>
        <code class="javascript">
          module:{
            rules:[
              {
              test:/\.xxx$/,//指定匹配规则
              use:{
                loader: 'xxx-load'//指定使⽤的loader
                }
              }
            ]
          }
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>module-loader</h3>
        <div class="tip">
          <p>模块解析，模块转换器，⽤于把模块原内容按照需求转换成新内容。</p>
          <p>webpack是模块打包⼯具，⽽模块不仅仅是js，还可以是css，图⽚或者其他格式</p>
          <p>但是webpack默认只知道如何处理js和JSON模块，那么其他格式的模块处理，和处理⽅式就需要loader了</p>
        </div>
        <pre>
        <code class="javascript">
          // 常见的loader
          style-loader
          css-loader
          less-loader
          sass-loader
          ts-loader //将Ts转换成js
          babel-loader//转换ES6、7等js新特性语法
          file-loader//处理图⽚⼦图
          eslint-loader

          file-loader //处理静态资源模块 原理是把打包⼊⼝中识别出的资源模块，移动到输出⽬录，并且返回⼀个地址名称 ,当我们需要模块，仅仅是从源代码挪移到打包⽬录，就可以使⽤file-loader来处理，txt，svg，csv，excel，图⽚资源啦等等
          npm install file-loader -D
          module: {
            rules: [
              {
              test: /\.(png|jpe?g|gif)$/,     
                use: {                        //use使⽤⼀个loader可以⽤对象，字符串，两个loader需要⽤数组
                  loader: "file-loader",
                  options: {  // options额外的配置，⽐如资源名称
                  name: "[name]_[hash].[ext]",                    // placeholder 占位符 [name]⽼资源模块的名称 [ext]⽼资源模块的后缀 https://webpack.js.org/loaders/fileloader#placeholders
                  outputPath: "images/" //打包后的存放位置
                  }
                }
              }
            ]
          },

          css-loader 分析css模块之间的关系，并合成⼀个css
          loader执⾏顺序：从后往前
          Style-loader 会把css-loader⽣成的内容，以style挂载到⻚⾯的heade部分
          npm install style-loader css-loader -D

          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }

          {
            test:/\.css$/,
            use:[{
                loader:"style-loader",
                options: {
                  injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个
                }
              },"css-loader"]
          }

        </code>
        </pre>
      </div>
      <div class="block">
        <h3>Plugins</h3>
        <div class="tip margin-b-20">
          <p>plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念</p>
          <p>扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情。</p>
          <p>作⽤于整个构建过程</p>
        </div>
        <div class="tip">
          <p>htmlwebpackplugin 插件配置参数</p>
          <p>title: ⽤来⽣成⻚⾯的 title 元素</p>
          <p>filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直接配置带有⼦⽬录。</p>
          <p>template: 模板⽂件路径，⽀持加载器，⽐如 html!./index.html</p>
          <p>inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的</p>
          <p>template 或者 templateContent 中，如果设置为 true 或者 body，所有的</p>
          <p>javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。</p>
          <p>favicon: 添加特定的 favicon 路径到输出的 HTML ⽂件中。</p>
          <p>minify: {} | false , 传递 html-minifier 选项给 minify 输出</p>
          <p>hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash</p>
          <p>到所有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。</p>
          <p>cache: true | false，如果为 true, 这是默认值，仅仅在⽂件修改之后才会发布⽂件。</p>
          <p>showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到HTML ⻚⾯中</p>
          <p>chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块)</p>
          <p>chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none'| 'default' | {function}-default:'auto'</p>
          <p>excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)</p>
        </div>
        <pre>
        <code class="javascript">
          HtmlWebpackPlugin
          htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html中。
          npm install --save-dev html-webpack-plugin
          const path = require("path");

          const htmlWebpackPlugin = require("html-webpack-plugin");
          module.exports = {
            ...
            plugins: [
              new htmlWebpackPlugin({
                title: "My App",
                filename: "app.html",
                template: "./src/index.html"
              })
            ]
          }
          //index.html
          <title><%= htmlWebpackPlugin.options.title %></title>


          clean-webpack-plugin
          npm install --save-dev clean-webpack-plugin

          const { CleanWebpackPlugin } = require("clean-webpack-plugin");
          plugins: [
            new CleanWebpackPlugin()
          ]
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>sourceMap</h3>
        <div class="tip">
          <p>源代码与打包后的代码的映射关系，通过sourceMap定位到源代码</p>
          <p>在dev模式中，默认开启，关闭的话 可以在配置⽂件⾥ devtool:"none"</p>
          <p>devtool的介绍：https://webpack.js.org/configuration/devtool#devtool</p>
          <p>eval:速度最快,使⽤eval包裹模块代码,</p>
          <p>source-map： 产⽣ .map ⽂件</p>
          <p>cheap:较快，不包含列信息</p>
          <p>Module：第三⽅模块，包含loader的sourcemap（⽐如jsx to js ，babel的sourcemap）</p>
          <p>inline： 将 .map 作为DataURI嵌⼊，不单独⽣成 .map ⽂件</p>
        </div>
        <pre>
        <code class="javascript">
          配置推荐：
          devtool:"cheap-module-eval-source-map",// 开发环境配置
          //线上不推荐开启 --线上不用配置
          devtool:"cheap-module-source-map", // 线上⽣成配置
        </code>
        </pre>
      </div>
      <div class="block">
        <h3>Webpack.config.js 配置</h3>
        <pre>
        <code class="javascript">
        const path = require("path");
        const webpack = require("webpack")
        module.exports = {
            entry: "./src/index.js", // 必填 webpack执⾏构建⼊⼝
            output: {
                filename: "js/[name]_[hash:6].[ext]", // 默认输出到index.js文件下
                path: path.resolve(__dirname, "./dist"),  // 输出⽂件的存放路径，必须是绝对路径
                publicPath:'//lzd.cdn.com' // cdn 服务器 ,说有的输出文件都会带上这个， 最终应用的时候会变成 (script src="//lzd.cdn.com/main.js")
             },
            module:{
              rules:[{
                test:/\.css$/,
                include: path.resolve(__dirname,'./src')
                loader:['style-loader','css-loader','postcss-loader','less-loader']
              }]
            },
            resolve:{

            },
            plugins:[
              new MiniCssExtractPlugin({
                filename:'css/[name]_[contenthash:6].css',
                chunkFilename:'[id].css'
              })
            ]

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
  methods: {}
};
</script>
