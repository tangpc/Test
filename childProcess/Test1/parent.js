//主进程
var childProcess = require('child_process');
var child = childProcess.fork('./child.js');

//接受来自子进程的消息
child.on('message', function(msg) {
  console.log('来自子进程的消息: ', msg);
});

child.send({ hello: '父' });

//超时关闭子进程
setTimeout(function(){
  child.kill();
},10000);