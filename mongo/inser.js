/**
 * 插入数据
 */
const connect = require('./connect');
module.exports = function(collectionName,arr,callback){
  connect(collectionName,(err,dbName,client) => {
    if(err){
      // console.log('服务器连接失败')
      callback(err,null)
      return
    }
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertMany(arr, function(err, result) {
      callback(err,result);
      client.close();
    });
  })
}