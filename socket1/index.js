var path = require('path');
var app = require('express')(),
    server = require('http').createServer(app),
    port = 8080,
    io = require('socket.io')(server);

io
  .on('connection', function(socket) {
      socket.on('disconnect', function() {
          console.log('/: disconnect-------->')
      });

      socket.on('b:message', function() {
          socket.emit('s:message', '/: '+port);
          console.log('/: '+port)
      });
  });

io.of('/ws')
  .on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('disconnect-------->')
    });

    socket.on('b:message', function() {
        socket.emit('s:message', port);
    });
});

app.get('/page',function(req,res){
    res.sendFile(path.join(process.cwd(),'./index.html'));
});

server.listen(8080);