var express = require("express");

var http = require("http");

var app = express();

var server = http.createServer(app);

app.use(express.static("www"));

server.listen(8080, function() {
  console.log("HTTP SERVER 启动成功! 监听端口:" + 8080);
});


var tpc_im = require('./tpc_im.js');
tpc_im.create(server);

tpc_im.io.on('connection', function(socket) {
  //接收并处理客户端的hi事件
  socket.on('hi111', function(data) {
      console.log('开始链接');
      shangchuan(data);
  });
});

//发送进度条信息
function shangchuan(data){
    var i = 1;
    var a = setInterval(() => {
        tpc_im.io.emit('hi222',i);
        i++;
        if(i==100){
            clearInterval(a)
       }
    },100);
}