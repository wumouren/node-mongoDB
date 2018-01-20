/**
 * 连接数据库
 * 
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const base = config.mongoBase;
const name = config.dbName;
module.exports = function(collectionName,callback){
  const url = base + name;
  MongoClient.connect(url, function(err, client) {
    if(err){
      callback(err,null,null);
      return
    }
    callback(err,name,client)
  });
}