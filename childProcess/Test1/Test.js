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

// var a = childProcess.execFile('','');
// console.log(a);

// console.log("11111111111111111111111111111111111111111111111111");
// const { execFile } = require('child_process');
// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });
// console.log("22222222222222222222222222222222222222222222222222");

var defaults = {
    encoding: 'utf8'
};


var child_process = require('child_process');
var execFileSync = child_process.execFileSync;
// var a = execFileSync('C:\\Program Files (x86)\\Tencent\\QQ\\Bin\\QQScLauncher.exe',[],defaults);
// console.log(a);
var arg1 = "C:\\Program Files\\nodejs\\node.exe";
var arg2 = "C:\\Users\\Administrator\\Desktop\\item\\YSJ\\Test\\Time.js";

var cmd = "C:\\Windows\\System32\\cmd.exe";

var a = execFileSync(cmd,['ls'],defaults);
console.log(a);


// C:\Users\Administrator\Desktop