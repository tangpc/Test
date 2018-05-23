var 声明变量
let 声明的变量只在它所在的代码块有效
{
    let a = 10;
    var b = 1;
}
console.log(a);      //a is not defined
console.log(b);


//for适合使用let声明变量
for (let i = 0; i < 10; i++) {
    // ...
}
console.log(i); //i is not defined


var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); //10

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); //6


for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// abc
// abc
// abc
//输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域


//不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
//变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。
//变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。


//暂时性死区(TDZ)
var tmp = 123;
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 321;
    console.log(tmp); // 321
}
//只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。


typeof undeclared_variable // "undefined"
typeof x; // ReferenceError
let x;
//变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错


function bar(x = y, y = 2) {
    return [x, y];
}
bar(); // 报错
//因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。
function bar(x = 2, y = x) {
    return [x, y];
}
bar(); // [2, 2]


// 不报错
var x = x;
// 报错
let x = x;


//不允许重复声明
// 报错
function func() {
    let a = 10;
    var a = 1;
}
//let不允许在相同作用域内，重复声明同一个变量
// 报错
function func() {
    let a = 10;
    let a = 1;
}

//因此，不能在函数内部重新声明参数。
function func(arg) {
    let arg; // 报错
}

function func(arg) {
    {
        let arg; // 不报错
    }
}


//块级作用域
var tmp = new Date();

function f() {
    console.log(tmp);//<--在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
    if (false) {
        var tmp = 'hello world';
    }
}
f(); // 变量提升输出undefined


var s = 'hello';

for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}

console.log(i); // 5


function f1() {
    let n = 5;
    if (true) {
        let n = 10;
        console.log(n); // 10
    }
    console.log(n); // 5
}
f1()


{
    {
        {
            {
                { let insane = 'Hello World' }
                console.log(insane); // 报错
                //外层作用域无法读取内层作用域的变量
            }
        }
    }
};


{
    {
        {
            {
                let insane = 'Hello World';
                { let insane = 'Hello World' }
                //内层作用域可以定义外层作用域的同名变量
            }
        }
    }
};


//立即执行函数表达式（IIFE）
(function () {
    var tmp = 111;
    console.log(tmp + 2);
}());

// 块级作用域写法
{
    let tmp = 111;
    console.log(tmp + 2);
}


function f() { console.log('I am outside!'); }

(function () {
    // 重复声明一次函数f
    if (false) {
        function f() { console.log('I am inside!'); }
    }
    f();//I am inside!
}());
f();//I am outside!


// 函数声明语句
{
    let a = 'secret';
    function f() {
        return a;
    }
    console.log(f());
}

// 函数表达式
{
    let a = 'secret';
    let f = function () {
        return a;
    };
    console.log(f());
}