// //即时的im聊天室
// const net =require('net')
// const chatServer = net.createServer()
// const clientList =[];
// chatServer.on('connection',client=>{
//     client.write('Hi!\n')
//     clientList.push(client)
//     client.on('data',data=>{
//         console.log('received：'+data.toString())
//         // 广播
//         clientList.forEach(v=>{
//             v.write(data)
//         })   
//     })
// })
// chatServer.listen(9000)

const fs = require('fs')
const http =require('http')
http.createServer((req,res)=>{
    const {method,url} = req;
    if(method==='GET' && url==='/'){
        res.setHeader('Content-Type','text/html')
       res.end()
    }
    if(method ==='POST'&& url==='/user/get'){
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify([{name:'jerry'}]))
    }
}).listen(9000)