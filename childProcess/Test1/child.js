//子进程
//接受来自父进程的消息
process.on('message', function(msg) {
    console.log('收到父进程的消息:', msg);
});
  
setInterval(function(){
    process.send({ Hello: '子进程    '+process.connected+'   '+new Date().toLocaleString()});
},1000);