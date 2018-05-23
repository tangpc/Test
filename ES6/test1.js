{
    let a = 1;
    let b = 2;
    let c = 3;

    console.log(a);// 1
    console.log(b);// 2
    console.log(c);// 3
}

{
    //ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
    let [a, b, c] = [1, 2, 3];
    console.log(a);// 1
    console.log(b);// 2
    console.log(c);// 3
}

{
    //这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log(foo); // 1
    console.log(bar); // 2
    console.log(baz); // 3
}

{
    let [, , third] = ["foo", "bar", "baz"];
    console.log(third); // "baz"
}

{
    let [x, , y] = [1, 2, 3];
    console.log(x); // 1
    console.log(y); // 3
}

{
    let [head, ...tail] = [1, 2, 3, 4];
    console.log(head); // 1
    console.log(tail); // [2, 3, 4]

}

{
    let [a, b, ...z] = ['a'];
    console.log(a); // "a"
    console.log(b); // undefined
    console.log(z); // []
}

{
    //如果解构不成功，变量的值就等于undefined
    let [foo] = [];
    let [bar, foos] = [1];
    console.log(foo);//undefined
    console.log(foos);//undefined
    console.log(bar);//1
}

{
    //另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
    let [x, y] = [1, 2, 3];
    console.log(x); // 1
    console.log(y); // 2

    let [a, [, b], d] = [1, [, 2, 3], 4];
    console.log(a); // 1
    console.log(b); // 2
    console.log(d); // 4
}

{
    // let [foo1] = 1;// 报错
    // let [foo2] = false;// 报错
    // let [foo3] = NaN;// 报错
    // let [foo4] = undefined;// 报错
    // let [foo5] = null;// 报错
    // let [foo6] = {}; // 报错
    //上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（第六个表达式）
    let [foo7] = []; // []
}

{
    let [x, y, z] = new Set([, 'a', 'b', 'c']);
    console.log(x); // undefined
    console.log(y); // "a"

}

{
    //fibs是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
    function* fibs() {
        let a = 0;
        let b = 1;
        while (true) {
            yield a;
            console.log("[" + a + "," + b + "] = [" + b + "," + a + "+" + b + "] ");
            [a, b] = [b, a + b];
        }
    }
    // [0,1] = [1,0+1] 
    // [1,1] = [1,1+1] 
    // [1,2] = [2,1+2] 
    // [2,3] = [3,2+3] 
    // [3,5] = [5,3+5] 
    // [5,8] = [8,5+8] 
    // [8,13] = [13,8+13] 
    let [first, second, third, fourth, fifth, sixth, seven, s6] = fibs();
    console.log(first);// 0
    console.log(second);// 1
    console.log(third);// 1
    console.log(fourth);// 2
    console.log(fifth);// 3
    console.log(sixth);// 5
    console.log(seven);// 8
    console.log(s6);// 13
}

{
    //默认值
    let [foo = true] = [];
    console.log(foo); // true
    //注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
    let [x, y = 'b'] = ['a'];
    console.log(x + "\t" + y); //a    b
    let [x1, y1 = 'b'] = ['a', undefined];
    console.log(x1 + "\t" + y1); //a   b

    let [x2 = 1] = [undefined];
    console.log(x2); // 1
    let [x3 = 1] = [null];
    console.log(x3); // null
    //因为null不严格等于undefined。
}

{
    function f() {
        console.log('aaa');
    }
    let [x = f()] = [1];
    //x能取到值，所以函数f不会执行
    console.log(x);//1

    let x1;
    if ([1][0] === undefined) {
        x1 = f();
    } else {
        x1 = [1][0];
    }
    console.log(x1);//1
}

{
    //默认值可以引用解构赋值的其他变量，但该变量必须已经声明
    { let [x = 1, y = x] = []; }// x=1; y=1
    { let [x = 1, y = x] = [2]; }   // x=2; y=2
    { let [x = 1, y = x] = [1, 2]; } // x=1; y=2
    { let [x = y, y = 1] = []; }     // ReferenceError: y is not defined
    //最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
}

{
    //对象的解构赋值
    {
        let { foo, bar } = { foo: "aaa", bar: "bbb" };
        console.log(foo); // "aaa"
        console.log(bar); // "bbb"
    }
    //对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
    //而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
    {
        let { bar, foo } = { foo: "aaa", bar: "bbb" };
        console.log(foo); // "aaa"
        console.log(bar); // "bbb"

        let { baz } = { foo: "aaa", bar: "bbb" };
        console.log(baz); // undefined
    }

    {
        let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
        console.log(baz); // "aaa"
        // console.log(foo); //foo is not defined
        //上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

        let obj = { first: 'hello', last: 'world' };
        let { first: f, last: l } = obj;
        console.log(f); // 'hello'
        console.log(l); // 'world'

        let { foo: foo, bar: bar } = { foo: "aaa1", bar: "bbb1" };
        console.log(foo);// aaa1
        console.log(bar);// bbb1
        //对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
    }
}

{
    let obj = {
        p: [
            'Hello',
            { y: 'World' }
        ]
    };
    //{p: ['Hello',{ y: 'World' }]}

    {
        let { p: [x, { y }] } = obj;
        console.log(x); // "Hello"
        console.log(y); // "World"
    }
    //这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。
    {
        let { p, p: [x, { y }] } = obj;
        console.log(x); // "Hello"
        console.log(y); // "World"
        console.log(p); // ["Hello", {y: "World"}]
    }
}

{
    const node = {
        loc: {
            start: {
                line: 1,
                column: 5
            }
        }
    };
    //{loc:{start:{line:1,column:5}}}

    let { loc, loc: { start }, loc: { start: { line } } } = node;
    console.log(line);// 1
    console.log(loc);// Object {start: Object}
    console.log(start); // Object {line: 1, column: 5}
    //上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。
    //注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
}

{
    let obj = {};
    let arr = [];

    ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

    obj // {prop:123}
    arr // [true]
}

{
    var { x = 3 } = {};
    x // 3

    var { x, y = 5 } = { x: 1 };
    x // 1
    y // 5

    var { x: y = 3 } = {};
    y // 3

    var { x: y = 3 } = { x: 5 };
    y // 5

    var { message: msg = 'Something went wrong' } = {};
    msg // "Something went wrong"
}

{
    var { x = 3 } = { x: undefined };
    x // 3

    var { x = 3 } = { x: null };
    x // null
}

{
    let { foo } = { bar: 'baz' };
    foo // undefined
}

{
    // 报错
    let { foo: { bar } } = { baz: 'baz' };
}

{
    let _tmp = { baz: 'baz' };
    _tmp.foo.bar // 报错
}

{
    let x;
    // { x } = { x: 1 };// 错误的写法  SyntaxError: syntax error
    ({ x } = { x: 1 }); // 正确的写法
}

{
    ({} = [true, false]);
    ({} = 'abc');
    ({} = []);
}

{
    //下标     0  1  2  3
    let arr = [1, 2, 6, 3];
    let { 0: first, 2: first1, [arr.length - 1]: last } = arr;
    console.log(arr);
    console.log(first); // 1
    console.log(first1); // 6
    console.log(last);  // 3
}

{
    //字符串的解构赋值
    //字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
    const [a, b, c, d, e, f] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"
    f // undefined
}

{
    //类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
    let { length: len } = 'hello';
    len // 5
}

{
    //解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
    let { toString: s } = 123;
    s === Number.prototype.toString // true

    let { toString: s1 } = true;
    s1 === Boolean.prototype.toString // true
    //上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
}

{
    let { prop: x } = undefined; // TypeError
    let { prop: y } = null; // TypeError
    //解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
    //由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
}

{
    //函数参数的解构赋值
    function add([x, y]) {
        return x + y;
    }

    add([1, 2]); // 3

    var a = [[1, 2], [3, 4]].map(([a, b]) => a + b);
    console.log(a);// [ 3, 7 ]
}

{
    function move({ x = 0, y = 0 } = {}) {
        return [x, y];
    }

    move({ x: 3, y: 8 }); // [3, 8]
    move({ x: 3 }); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]
}

{
    function move({ x, y } = { x: 0, y: 0 }) {
        return [x, y];
    }

    move({ x: 3, y: 8 }); // [3, 8]
    move({ x: 3 }); // [3, undefined]
    move({}); // [undefined, undefined]
    move(); // [0, 0]
    //上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
}

{
    [1, undefined, 3].map((x = 'yes') => x);
    // [ 1, 'yes', 3 ]
}

{//圆括号的使用

    // 全部报错
    //（1）变量声明语句
    // let [(a)] =[1];

    // let { x: (c)} = { };
    // let({ x: c }) = {};
    // let {(x: c)} = { };
    // let {(x): c} = { };

    // let { o: ({ p: p }) } = { o: { p: 2 } };

    //（2）函数参数
    // 报错
    // function f([(z)]) { return z; }
    // 报错
    // function f([z,(x)]) { return x; }


    // 全部报错
    // ({ p: a }) = { p: 42 };
    // ([a]) = [5];

    // 报错
    // [({ p: a }), { x: c }] = [{}, {}];


    [(b)] = [3]; // 正确
    ({ p: (d) } = {}); // 正确
    [(parseInt.prop)] = [3]; // 正确
}


{//用途

    {//（1）交换变量的值
        let x = 1;
        let y = 2;
        [x, y] = [y, x];
        console.log(x + "\t" + y);
    }

    {//（2）从函数返回多个值
        {// 返回一个数组
            function example() {
                return [1, 2, 3];
            }
            let [a, b, c] = example();
            console.log(a + "\t" + b + "\t" + c);//1    2   3
        }
        {// 返回一个对象
            function example() {
                return {
                    foo: 1,
                    bar: 2
                };
            }
            let { foo, bar } = example();
            console.log(foo);//1
            console.log(bar);//2
        }
    }

    {//（3）函数参数的定义
        {// 参数是一组有次序的值
            function f([x, y, z]) { console.log(x + "\t" + y + "\t" + z); }
            f([1, 2, 3]);
        }

        {// 参数是一组无次序的值
            function f({ x, y, z }) { console.log(x + "\t" + y + "\t" + z); }
            f({ z: 3, y: 2, x: 1 });
        }
    }

    {//（4）提取 JSON 数据
        let jsonData = {
            id: 42,
            status: "OK",
            data: [867, 5309]
        };

        let { id, status, data: number } = jsonData;

        console.log(id, status, number);// 42, "OK", [867, 5309]
    }

    {//（5）函数参数的默认值
        function jQueryAjax(url, {
            async = true,
            beforeSend = function () { },
            cache = true,
            complete = function () { },
            crossDomain = false,
            global = true,
            // ... more config
        } = {}) {
            // ... do stuff
            console.log(url);//www.URL
            console.log(async);//true
            console.log(beforeSend);//[Function: beforeSend]
            console.log(cache);//11
        };
        jQueryAjax("www.URL", { cache: 11 });
    }

    {//（6）遍历 Map 结构
        const map = new Map();
        map.set('first', 'hello');
        map.set('second', 'world');

        for (let [key, value] of map) {
            console.log(key + " is " + value);
        }
        // first is hello
        // second is world

        // 获取键名
        for (let [key] of map) {
            console.log(key + " is ");
        }
        //first is 
        //second is 

        // 获取键值
        for (let [, value] of map) {
            console.log(" is " + value);
        }
        // is hello
        // is world
    }

    {//（7）输入模块的指定方法
        const { readFile, readFileSync } = require("fs");
        readFile('test/.gitignore', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取: " + data.toString());
        });
        var a = readFileSync('test/.gitignore');
        console.log(a.toString());
    }
}