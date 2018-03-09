var child_process = require('child_process');
var Fiber = require('fibers');

var childProcess = {};

/**
 * 异步执行控制台命令
 * @param {*执行命令} command node
 * @param {*执行命令参数} commandArray ['-v'] 或者 ['','']逗号隔开
 * @param {*超时时间 毫秒} timeout 5000
 */
childProcess.spawn = function(command,commandArray,timeout){
    
    var spawn = child_process.spawn;

    const defaults = {
        cwd: null,
        env: process.env
      };
    
    // var wmic = spawn('wmic', ['DiskDrive', 'get', 'Size', '/value']);
    var wmic = spawn(command, commandArray, defaults);

    //监听子进程输出
    wmic.stdout.on('data', function(data) {
        console.log('spawn输出: ' + data);
    });

    //监听进程  运行错误
    wmic.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    //监听进程  启动错误
    wmic.on('error', (err) => {
        console.log('启动子进程失败!');
    });

    //监听进程关闭
    wmic.on('close', function(code) {
        /* if (code == 0) {
            console.log("成功\tSUCCESS\t" + code);
        } else {
            console.log("错误\tERROR\t" + code);
        } */
    });

    //超时关闭进程
    if (timeout != undefined){
        setTimeout(function(){
            wmic.kill();
        },timeout);
    }
}

/**
 * 同步执行控制台命令
 * @param {*执行命令} command node -v
 * @param {*超时时间 毫秒} timeout 5000 
 */
childProcess.execSync = function(command,timeout){
    
    var execSync = child_process.execSync;
    var result = null;
   
    if (timeout == undefined) timeout = 5000;

    var defaults = {
        encoding: 'utf8',//编码
        timeout: timeout,//超时时间
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,//执行目录，默认为null, 'C:\\Users\\Administrator\\Desktop\\item\\web'
        env: null
    };
    
    try {
        result = execSync(command,defaults);
    } catch (e) {
        console.log(e.stack);
        return result;
    }
    return result;
}


/**
 * 同步执行控制台命令
 * @param {*执行命令} command node -v
 * @param {*超时时间 毫秒} timeout 5000 
 */
childProcess.exec = function(command,timeout){
    
    var exec = child_process.exec;
    var result = null;
    var fiber = Fiber.current;
   
    if (timeout == undefined) timeout = 5000;

    var defaults = {
        encoding: 'utf8',//编码
        timeout: timeout,//超时时间
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,//执行目录，默认为null, 'C:\\Users\\Administrator\\Desktop\\item\\web'
        env: null
    };
    
    exec(command,defaults,function(error,stdout,stderr){
        if (error) {
            console.log(error.stack);
            return null;
        }
        result = stdout;
        fiber.run();
    });    
    Fiber.yield();
    return result;
}



/* 
childProcess.execFile = function(command,timeout){
    
    const util = require('util');
    const execFile = util.promisify(require('child_process').execFile);
    async function getVersion() {
    const { stdout } = await execFile('node', ['--version']);
    console.log(stdout);
    }
    getVersion();
}
 */
module.exports = childProcess;