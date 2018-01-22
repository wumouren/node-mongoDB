const app = require('express');
const mongo = require('./mongo');
const server = app();
server
.get('/insert',(req,res) => {
  const time1 = new Date().getTime();
  const time2 = new Date().getTime();
  const data = [
    {time: time1,id: 110,name: 'jack',sex: 'boy'},
    {time: time2,id: 111, name: 'lili',sex: 'girl'},
  ]
  mongo.inser('time',data,(err,result) => {
    if(err){
      // console.log(err);
      res.send('插入数据失败')
      return
    }
    res.send(result)
  })
})
.get('/remove',(req,res) => {
  const delData = {id: 110};
  mongo.remove('time',delData,(err,result) => {
    if(err){
      // console.log(err);
      res.send('删除数据失败')
      return
    }
    res.send(result)
  })
})
.get('/update',(req,res) => {
  const findData = {id: 111}
  const updateData = {id: 112};
  mongo.update('time',findData,updateData,(err,result) => {
    if(err){
      // console.log(err);
      res.send('修改数据失败')
      return
    }
    res.send(result)
  })
})
.get('/find',(req,res) => {
  // console.log('客户端访问')
  mongo.find('time',{id: 110},(err,result) => {
    if(err){
      // console.log(err);
      res.send('数据读取错误')
      return
    }
    res.send(result)
  })
})
.listen(8000,() => {
  // console.log('server run 8000')
})