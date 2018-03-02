setTimeout(function(){
    console.log("子进程\t\t" + new Date().toLocaleString());
},2000);


setInterval(function(){
    console.log("子进程\t\t" + new Date().toLocaleString());
},1000);