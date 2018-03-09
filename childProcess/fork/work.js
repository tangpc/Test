/* process.on('message',function(m,server){
  console.log(m);
  console.log(server);
  if(m==='server'){
    server.on('connection',function(socket){
      socket.end('console.log(\'handle by child\')');
    });
  }
}); */

/*
setTimeout(() => {
		console.log("进程关闭成功");
		process.kill(process.pid);//根据进程id杀死进程
	}, 5000);
*/

var express = require('express');
var http = require('http');

var app = express();
// var serverInChild = http.createServer(app);
var serverInChild = http.createServer(function(req,res){
	res.end('I am child.Id:'+process.pid);
 });
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