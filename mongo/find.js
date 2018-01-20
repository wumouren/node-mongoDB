/**
 * collectionName 集合名
 * limit 每页多少条，
 * skip 跳过多少条
 * query 查询条件
 * paging 分页
 * cb 回掉
 */
const connect = require('./connect');
module.exports = function(collectionName,query,paging,cb){
  let search;
  let page;
  let callback;
  let limit; 
  let skip;  
  if(arguments.length === 2){
    search = {};
    page = {
      pageNo: 0,
      pageSize: 0,
      sort: {
        time: 1
      }
    };
    callback = query;
  }else if(arguments.length === 3){
    search = query;
    page = {
      pageNo: 0,
      pageSize: 0,
      sort: {
        time: 1
      }
    };
    callback = paging;
  }else if(arguments.length === 4){
    search = query;
    page = paging;
    callback = cb;
  }
  connect(collectionName,(err,dbName,client) => {
    if(err){
      console.log('服务器连接失败')
      callback(err,null)
      return
    }
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    limit = page.pageSize;
    skip = (page.pageNo - 1) * page.pageSize;
    collection.count()
    .then(data => {
      collection.find(search).sort(page.sort).limit(limit).skip(skip).toArray(function(err, docs) {
        callback(err,{result: docs,count: data});
        client.close();
      })
    })
  })
}