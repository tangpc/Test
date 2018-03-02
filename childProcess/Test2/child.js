console.log('小');
process.on('message', function(m){
    console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});
console.log("child\t"+process.execArgv);
console.log("child\t"+process.argv);

setInterval(function(){
    process.send({from: 'child' + new Date().toLocaleString()});
},1000);