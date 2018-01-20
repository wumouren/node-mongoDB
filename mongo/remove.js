/**
 * 删除数据
 */
const connect = require('./connect');
module.exports = function(collectionName,del,callback){
  connect(collectionName,(err,dbName,client) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.deleteMany(del, function(err, result) {
      callback(err,result);
    });    
  })
}