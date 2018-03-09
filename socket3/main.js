/* var cp = require('child_process');
var child = cp.fork('./work.js');
var server = require('net').createServer();
//监听客户端的连接
server.on('connection',function(socket){
  socket.end('console.log(\'handled by parent\')');
});
//启动监听8080端口
server.listen(8080,function(){
//给子进程发送TCP服务器(句柄)
  child.send('server',server);
}); */



var cp = require('child_process');
var child1 = cp.fork('./index.js');
var child2 = cp.fork('./index.js');
var child3 = cp.fork('./index.js');
var child4 = cp.fork('./index.js');
var server = require('net').createServer();
//父进程将接收到的请求分发给子进程
server.listen(8080,function(){
  child1.send('server',server);
  console.log(child1.pid);
  child2.send('server',server);
  console.log(child2.pid);
  child3.send('server',server);
  console.log(child3.pid);
  child4.send('server',server);
  console.log(child4.pid);
  // console.log(child1.connected);//child.connected 检查是否能发送消息   //child.disconnect()  断开链接
  //发送完句柄后关闭监听
  server.close();
});

child1.on('message', function(m){
  console.log("BBBBBBBBBBBBBB");
  console.log(child1.pid+'\tmessage from child: ' + JSON.stringify(m));
  child1.send({from: m});
});
child2.on('message', function(m){
  console.log("BBBBBBBBBBBBBB");
  console.log(child2.pid+'\tmessage from child: ' + JSON.stringify(m));
  child2.send({from: m});
});
child3.on('message', function(m){
  console.log("BBBBBBBBBBBBBB");
  console.log(child3.pid+'\tmessage from child: ' + JSON.stringify(m));
  child3.send({from: m});
});
child4.on('message', function(m){
  console.log("BBBBBBBBBBBBBB");
  console.log(child4.pid+'\tmessage from child: ' + JSON.stringify(m));
  child4.send({from: m});
});
    
  // setTimeout(() => {
  //   child1.send({from: 'parent'});
  // }, 6000);
  // setTimeout(() => {
  //   child2.send({from: 'parent'});
  // }, 6000);
  // setTimeout(() => {
  //   child3.send({from: 'parent'});
  // }, 6000);
  // setTimeout(() => {
  //   child4.send({from: 'parent'});
  // }, 6000);