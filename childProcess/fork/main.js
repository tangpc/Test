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
var child1 = cp.fork('./work.js');
var child2 = cp.fork('./work.js');
var child3 = cp.fork('./work.js');
var child4 = cp.fork('./work.js');
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



//监听进程  启动错误
child1.on('error', (err) => {
  console.log('启动子进程失败!');
});

//监听进程关闭
child1.on('close', function(code) {
  console.log("成功\tSUCCESS\t" + code);
});