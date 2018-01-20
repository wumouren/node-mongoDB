/**
 * 修改数据
 */
const connect = require('./connect');
module.exports = function(collectionName,search,upData,callback){
  connect(collectionName,(err,dbName,client) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.updateMany(search, { $set: upData }, {safe:true},function(err, result) {
      callback(err,result);
    });  
  })
}