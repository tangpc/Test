var childProcess = require('./childProcess.js');
var Fiber = require('fibers');
/* 
//同步执行命令
console.log("同步执行命令----------------------------execSync");
var result = childProcess.execSync('node time');
if (result == null) {
    console.log("执行失败!");
} else {
    console.log(result);
} 
console.log("同步执行命令----------------------------execSync");

console.log("\n----------------------------分割线----------------------------\n");


//异步执行命令
childProcess.spawn('node',['time']);


//fiber同步执行
Fiber(function () {
    console.log("fiber同步执行----------------------------exec");
    var result = childProcess.exec('node time');
    console.log(result);
    console.log("fiber同步执行----------------------------exec");
}).run();
 */



