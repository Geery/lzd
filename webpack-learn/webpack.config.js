const path = require('path')
const os =require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extractplugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assetswebpack-plugin");
const webpack = require('webpack')
const HappyPack = require("happypack") //优化loader的处理时间
const HappyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'ja/[name]_[hash:6].js',
        publicPatch: '//cdnURL.com' //指定存放JS⽂件的CDN地址 提高速度
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)$/,
            // use   Object | Array[String]
            include: path.resolve(__dirname, "./src"), // 缩小文件范围 提高打包速度
            use: ['happypack/loader?id=pics']
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, "./src"), // 缩小文件范围 提高打包速度
            use: [// "style-loader",
            MiniCssExtractPlugin.loader, // 抽取css 独立生成一份文件
            "css-loader",
            "less-loader",
            "postcss-loader"]
        }, {
            test: '/\.js$/',
            include: path.resolve(__dirname, "./src"), // 缩小文件范围 提高打包速度
            use: ['happypack/loader?id=babel']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello world',
            template: './index.html',
            filename: 'index.html',
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name]_[contenthash:6].css'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        // new HappyPack({ ----无法解决MiniCssExtractPlugin.loader
        //     id: 'css',
        //     loaders: [// "style-loader",
        //         MiniCssExtractPlugin.loader, // 抽取css 独立生成一份文件
        //         "css-loader",
        //         "less-loader",
        //         "postcss-loader"],
        //     threadPool: HappyPackThreadPool, // 共享进程
        // }),
        new HappyPack({
            id: 'pics',
            loaders: [{
                loader: 'file-loader',
                options: {
                    //[name] 保持原文件名称  [hash] hash值 用于缓存更新 [ext] 原文件后缀名
                    name: '[name]_[hash].[ext]', // images/[name].[ext]
                    outputPath: "imgs/"
                }
            }],
            threadPool: HappyPackThreadPool,// 共享进程
        }),
        new HappyPack({
            id: 'babel',
            loaders: ["babel-loader"],
            threadPool: HappyPackThreadPool,// 共享进程
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'), //直接指向dist目录下
        port: 8081,
        open: true,
        hot: true,
        hotOnly: true,// 保险栓 避免浏览器刷新
        proxy: {
            "/api": {
                target: 'xxxx'
            }
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 同步引入和异步引入都支持   //所有的 chunks 代码公共的部分打包到独立的chunks
            name: true,
            cacheGroups: { //缓存组 就是将匹配的库打包成一个以name命名的 文件  如果要分出来打包 就需要组的概念
                react: {
                    test: /react|react-dom/,
                    name: 'react'
                },
                lodash: {
                    test: /lodash/,
                    name: 'lodash'
                }
            }
        }
    },
    resolve: {
        modules: [path.resolve(__dirname, "./node_modules")], //⽤于配置webpack去哪些⽬录下寻找第三⽅模块，默认是['node_modules']
        alias: {
            '@': path.join(__dirname, "./pages"),
            react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"), //指定依赖文件 提高打包速度
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
        },
        extensions: ['js', 'json', 'jsx', 'ts'] //在导⼊语句没带⽂件后缀时，webpack会⾃动带上后缀后，去尝试查找⽂件是否存在,导入语句尽量带上后缀
    }

}

//浏览器支持并行 性能最大化  采用codespliting