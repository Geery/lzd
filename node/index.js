const os =require('os')
const mem =os.freemem()/os.totalmem *100
console.log(`CPU占用率：${mem}%`);
