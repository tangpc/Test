var child_process = require('child_process');
var fs = require('fs');

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./err.log', 'a');

var child = child_process.spawn('node', ['hello.js'], {
    detached: true,
    stdio: ['ignore', out, err]
});

//设定时间杀死进程
setTimeout(function(){
    child.kill();//杀死
},5000);