const http = require('http')
const app= http.createServer((req,res)=>{
    const {method,url} = req
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify([http]))
})
app.listen('3000')
