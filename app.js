const app = require('express');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017/node-mongodb';
const server = app();
server
.get('/',(req,res) => {
  console.log('客户端访问')
  MongoClient.connect(url, function(err, client) {
    if(err){
      res.send('数据库连接失败');
      return
    }
    const reqTime = new Date().getTime();
    const db = client.db('node-mongodb')
    db.collection('time').insertOne({time : reqTime}, function(err, result) {
      const resTime = new Date().getTime();
      console.log("数据库连接成功，并在" + resTime + "记录了连接时间，耗时" + (resTime - reqTime) + 'ms');
      res.send('你在' + resTime + '访问了数据库,记录数据花费了' + (resTime - reqTime) + 'ms')
      client.close();
    })
  });
})
.listen(8000,() => {
  console.log('server run 8000')
})
