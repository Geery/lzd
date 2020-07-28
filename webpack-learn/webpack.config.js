const path =require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
module.exports={
    entry:{
        main:'./src/index.js'
    },
    output:{
        path: path.resolve(__dirname,'build'),
        filename:'[name].js'
    },
    mode:'development'
    // devtool:'',
    // module:{
    //     rules:[{
    //         test:/\.(png|jpe?g|gif)$/,
    //         // use   Object | Array[String]
    //         use:{
    //             loader:'file-loader',
    //             options:{
    //                 //[name] 保持原文件名称  [hash] hash值 用于缓存更新 [ext] 原文件后缀名
    //                 name:'[name]_[hash].[ext]',
    //                 outputPath:"imgs/"
    //             }
    //         }
    //     }]
    // },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template:'./index.html'
    //     }),
    //     webpack.hot
    // ],
    // devServer:{
    //     contentBase:'',
    //     open:true,
    //     hot:true, 
    //     hotOnly:true// 保险栓 避免浏览器刷新
    // }

}