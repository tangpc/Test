var child_process = require('child_process');

var child = child_process.fork('./child.js');

child.on('message', function(m){
    console.log('message from child: ' + JSON.stringify(m));
});

child.send({from: 'parent'});

console.log("parent\t"+process.execArgv);
console.log("parent\t"+process.argv);

setTimeout(function(){
    child.kill();
},5000);


/*
node parent.js
parent 
parent  C:\Program Files\nodejs\node.exe,C:\Users\Administrator\Desktop\item\YSJ\T\parent.js
小
message from child: {"from":"child"}
child  
child   C:\Program Files\nodejs\node.exe,C:\Users\Administrator\Desktop\item\YSJ\T\child.js
message from parent: {"from":"parent"}
message from child: {"from":"child2018-3-2 17:42:48"}
message from child: {"from":"child2018-3-2 17:42:49"}
message from child: {"from":"child2018-3-2 17:42:50"}
message from child: {"from":"child2018-3-2 17:42:51"}
---------------------------------------------------------------------------------------------------------------------
node --harmony parent.js
parent  --harmony
parent  C:\Program Files\nodejs\node.exe,C:\Users\Administrator\Desktop\item\YSJ\T\parent.js
小
message from child: {"from":"child"}
child   --harmony
child   C:\Program Files\nodejs\node.exe,C:\Users\Administrator\Desktop\item\YSJ\T\child.js
message from parent: {"from":"parent"}
message from child: {"from":"child2018-3-2 17:42:48"}
message from child: {"from":"child2018-3-2 17:42:49"}
message from child: {"from":"child2018-3-2 17:42:50"}
message from child: {"from":"child2018-3-2 17:42:51"}
*/