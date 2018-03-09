var express = require('express');
var http = require('http');
var tpc_im = require('./tpc_im.js');

var app = express();
var serverInChild = http.createServer(app);
app.use(express.static("www"));


//子进程收到父进程传递的句柄(即客户端与服务器的socket连接对象)
process.on('message',function(m,serverInParent){
  if(m==='server'){
    //处理与客户端的连接
    serverInParent.on('connection',function(socket){
      //交给http服务来处理
			serverInChild.emit('connection',socket);
    });
  }
});


process.on('message', function(m){
		console.log("AAAAAAAAAAAAAAAAAAA");
    console.log(process.pid+'\tmessage from parent: ' + JSON.stringify(m));
});

setTimeout(() => {
	process.send({from: process.pid+'\tchild' + new Date().toLocaleString()});
}, 2000);


tpc_im.create(serverInChild);
tpc_im.io.on('connection', function(socket) {
  //接收并处理客户端的hi事件
  socket.on('sendMsg', function(data) {
			console.log('发送消息成功'+process.pid);

			//发送给父进程
			process.send({from: process.pid+'\t'+data+'\t' + new Date().toLocaleString()});

			tpc_im.io.emit('msg',data);
      // shangchuan(data);
  });
});

//发送进度条信息
function shangchuan(data){
    var i = 1;
    var a = setInterval(() => {
        i++;
        if(i==100){
            clearInterval(a)
       }
    },100);
}


app.get('/*.xhtml',function(req,res){
	var data = {};
	data.headers = req.headers;
	data.method = "GET";
	data.path = req.path;
	data.arg = (req.url).query;
	data.startTime = new Date().getTime();
	data.session = req.session;
	data.date = new Date().toLocaleString();
  data.ip = req.ip;
  res.send(JSON.stringify(data)).end();
});

/* app.post('/*.xhtml',function(req,res){
	var bufs = [];
	req.on('data', function(chunk){
		bufs.push(chunk);
	}).on('end',function(){
			var data = {};
			data.headers = req.headers;
			data.method = "POST";
			data.path = req.path;
			data.arg = (req.url).query;
			data.data = Buffer.concat(bufs).toString();
			// data.data = data.data.substring(5, data.data.length);//TPC
			data.buf = Buffer.concat(bufs);
			data.startTime = new Date().getTime();
			data.session = req.session;
			data.date = new Date().toLocaleString();
			data.ip = req.ip;
      console.log(data);
      res.send(JSON.stringify(data)).end();
	});
}); */

app.post('/api.post',function(req,res){
	console.log("+++++++++++++++++++console.log(req)++++++++++++++++++++")
	console.log(req.headers)
	console.log("+++++++++++++++++++console.log(res)++++++++++++++++++++")
	var body = '';
	req.on('data', function(chunk){
		body += chunk;
	});

	req.on('end', function(){
      console.log(body);
      res.status(200).send(body);
      // res.end();
  });
  
  
});