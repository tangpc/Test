{
    {//字符的 Unicode 表示法
        var a = "\u0062";
        console.log(a);// "b"

        var b = "\uD842\uDFB7";
        console.log(b);// "𠮷"

        var c = "\u20BB7";
        console.log(c);// "₻7"
        //如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7）
    }

    {//ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
        var a = "\u{20BB7}";
        console.log(a); "𠮷"

        var b = "\u{41}\u{42}\u{43}";
        console.log(b);// "ABC"

        let hello = 123;
        //console.log(hell\u{6F}); //123

        var a1 = "\u{1F680}";
        let a2 = "\uD83D\uDE80";
        if (a1 == a2) {
            console.log("\u{1F680}==true\uD83D\uDE80");//🚀==true🚀
        }
        if (a1 === a2) {
            console.log("\u{1F680}===true\uD83D\uDE80");//🚀===true🚀
        }
    }
    {
        var z = 'z';
        var z1 = '\z';
        console.log(z === z1);// true
        var z2 = '\172';
        console.log(z === z2);// true
        var z3 = '\x7A';
        console.log(z === z3);// true
        var z4 = '\u007A';
        console.log(z === z4);// true
        var z5 = '\u{7A}';
        console.log(z === z5);// true
    }
}

{//codePointAt()
    //JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
    var s = "𠮷";//汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是0x20BB7，UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271）需要4个字节储存。对于这种4个字节的字符

    console.log(s.length); // 2 //JavaScript 不能正确处理，字符串长度会误判为2
    console.log(s.charAt(0)); // '�'//而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
    console.log(s.charAt(1)); // '�'
    console.log(s.charCodeAt(0)); // 55362
    console.log(s.charCodeAt(1)); // 57271

    {
        let s = '𠮷a';
        console.log(s.length); //3
        console.log(s.codePointAt(0)); // 134071
        console.log(s.codePointAt(1)); // 57271
        console.log(s.codePointAt(2)); // 97
        //codePointAt 方法会正确返回 32 位的 UTF-16 字符的码点
        //对于那些两个字节储存的常规字符，它的返回结果与 charCodeAt 方法相同。
        var a = s.codePointAt(0).toString(16);// "20bb7"
        var b = s.codePointAt(2).toString(16);// "61"
        //codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。
    }

    {//使用for...of循环，它会正确识别 32 位的 UTF-16 字符。
        let s = '𠮷a';
        for (let ch of s) {
            console.log(ch.codePointAt(0).toString(16));
        }
    }

    {//codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
        function is32Bit(c) {
            return c.codePointAt(0) > 0xFFFF;
        }

        console.log(is32Bit("𠮷")); // true
        console.log(is32Bit("a")); // false
    }
}

{//includes(), startsWith(), endsWith()
    //传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法
    // includes()：返回布尔值，表示是否找到了参数字符串。
    // startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    // endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
    {
        let s = 'Hello world!';

        console.log(s.startsWith('Hello')); // true         //开头
        console.log(s.startsWith('ello')); // false

        console.log(s.includes('o')); // true               //任意位置
        console.log(s.includes('!')); // true

        console.log(s.endsWith('!')); // true               //结尾
    }

    {//支持第二个参数，表示开始搜索的位置。
        let s = 'Hello world!';
        //       01234567891011
        console.log(s.startsWith('world', 6)); // true
        console.log(s.endsWith('Hello ', 6)); // true//endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
        console.log(s.includes('Hello', 6)); // false
    }
}

{//repeat()
    //repeat方法返回一个新字符串，表示将原字符串重复n次。
    {
        console.log('x'.repeat(3)); // "xxx"
        console.log('hello'.repeat(2)); // "hellohello"
        console.log('na'.repeat(0)); // ""

        //参数如果是小数，会被取整。
        console.log('na'.repeat(2.9)); // "nana");
    }

    {
        //如果repeat的参数是负数或者Infinity，会报错。
        // console.log('na'.repeat(Infinity));// RangeError
        // console.log('na'.repeat(-1));// RangeError
    }

    {
        //但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
        console.log('na'.repeat(-0.9)); // ""
        //参数NaN等同于 0。
        console.log('na'.repeat(NaN));// ""
        //如果repeat的参数是字符串，则会先转换成数字。
        console.log('na'.repeat('na')); // ""
        console.log('na'.repeat('3'));  // "nanana"
    }
}

{//padStart()，padEnd() 
    // //引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全
    // 'x'.padStart(5, 'ab') // 'ababx'
    // 'x'.padStart(4, 'ab') // 'abax'

    // 'x'.padEnd(5, 'ab') // 'xabab'
    // 'x'.padEnd(4, 'ab') // 'xaba'

    // //如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
    // 'xxx'.padStart(2, 'ab') // 'xxx'
    // 'xxx'.padEnd(2, 'ab') // 'xxx'

    // //如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
    // 'abc'.padStart(10, '0123456789')// '0123456abc'

    // //如果省略第二个参数，默认使用空格补全长度。
    // 'x'.padStart(4) // '   x'
    // 'x'.padEnd(4) // 'x   '


    // //padStart的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
    // '1'.padStart(10, '0') // "0000000001"
    // '12'.padStart(10, '0') // "0000000012"
    // '123456'.padStart(10, '0') // "0000123456"

    // //另一个用途是提示字符串格式。
    // '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    // '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
}

{//模板字符串

    //用反引号表示
    //使用反引号，则前面要用反斜杠转义
    let greeting = `\`Yo\` World!`;
    console.log(greeting);
    //`Yo` World!

    // 普通字符串
    var a = `In JavaScript '\n' is a line-feed.`;
    console.log(a);
    // In JavaScript '
    // ' is a line-feed.

    // 多行字符串
    var b = `In JavaScript this is
not legal.`;
    console.log(b);
    // In JavaScript this is
    // not legal.

    console.log(`string text line 1
string text line 2`);

    // 字符串中嵌入变量
    let name = "Bob", time = "today";
    var c = `Hello ${name}, how are you ${time}?`
    console.log(c);
    //Hello Bob, how are you today?


    {
        var html = `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`;
        console.log(html);
        //使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
        // <ul>
        //     <li>first</li>
        //     <li>second</li>
        // </ul>
    }

    {//模板字符串嵌套
        const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

        const data = [
            { first: '<Jane>', last: 'Bond' },
            { first: 'Lars', last: '<Croft>' },
        ];

        console.log(tmpl(data));

        //     <table>

        //     <tr><td><Jane></td></tr>
        //     <tr><td>Bond</td></tr>

        //     <tr><td>Lars</td></tr>
        //     <tr><td><Croft></td></tr>

        //   </table>

    }

    {
        {
            // (function (name) {
            //     return `Hello ${name}!`
            // })
            // 写法一
            let str = 'return ' + '`Hello ${name}!`';
            let func = new Function('name', str);
            var a = func('Jack') // "Hello Jack!"
            console.log(a);
        }

        {
            //(name) => `Hello ${name}!`
            // 写法二
            let str = '(name) => `Hello ${name}!`';
            let func = eval.call(null, str);
            var a = func('Jack') // "Hello Jack!"
            console.log(a);
        }
    }
}

{//模板编译
    let template = `
<ul>
<% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
<% } %>
</ul>
    `;

    function compile(template) {
        const evalExpr = /<%=(.+?)%>/g;
        const expr = /<%([\s\S]+?)%>/g;

        template = template
            .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
            .replace(expr, '`); \n $1 \n  echo(`');

        template = 'echo(`' + template + '`);';

        let script =
            `(function parse(data){
      let output = "";
  
      function echo(html){
        output += html;
      }
  
      ${ template}
  
      return output;
    })`;

        return script;
    }

    let parse = eval(compile(template));
    b = parse({ supplies: ["broom", "mop", "cleaner"] });
    console.log(b);
    // <ul>
    //     <li>broom</li>
    //     <li>mop</li>
    //     <li>cleaner</li>
    // </ul>
}

{//标签模板
    {
        let a = 5;
        let b = 10;

        //${}后会有一个空的字符串
        //${}每一个都是一个单独的参数
        tag`Hello${a + b}${a * b}world${b - a}`;
        //等同于
        //tag(['Hello', '', 'world ', ''], 15, 50, 5);


        tag2`Hello${a + b}${a * b}world${b - a}`;


        function tag(stringArr, value1, value2, value3) {
            console.log(stringArr);
            console.log(value1, value2, value3);
            // [ 'Hello', '', 'world', '' ]
            // 15 50 5
        }

        //等同于
        function tag2(stringArr, ...values) {
            console.log(stringArr);
            console.log(values);
            // [ 'Hello', '', 'world', '' ]
            // [ 15, 50, 5 ]
        }
    }

    {
        let a = 5;
        let b = 10;
        tag`Hello ${a + b} world ${a * b}`;
        function tag(s, v1, v2) {
            console.log(s[0]);// "Hello "
            console.log(s[1]);// " world "
            console.log(s[2]);// ""
            console.log(v1);// 15
            console.log(v2);// 50
            return "OK";// "OK"
        }
    }

    {
        let total = 30;
        {
            let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
            function passthru(literals) {
                let result = '';
                let i = 0;
                console.log(literals);//[ 'The total is ', ' (', ' with tax)' ]
                console.log(arguments);
                // {
                // '0': ['The total is ', ' (', ' with tax)'],
                // '1': 30,
                // '2': 31.5
                // }
                while (i < literals.length) {
                    result += literals[i++];
                    if (i < arguments.length) {
                        result += arguments[i];
                    }
                }

                return result;
            }
            console.log(msg); // "The total is 30 (31.5 with tax)"
        }
        //等同于
        {
            let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
            function passthru(literals, ...values) {
                let output = "";
                let index;
                for (index = 0; index < values.length; index++) {
                    output += literals[index] + values[index];
                }

                output += literals[index]
                return output;
            }
            console.log(msg); // "The total is 30 (31.5 with tax)"
        }
    }

    {//处理恶意攻击
        let sender = '<script>alert("abc")</script>'; // 用户提供的恶意代码
        let messageTo = SaferHTML`<p>${sender} has sent you a message.</p>`;

        console.log(messageTo);//<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

        let message =
            SaferHTML`<p>${sender} has sent you a message.</p>`;

        function SaferHTML(templateData) {
            let s = templateData[0];
            for (let i = 1; i < arguments.length; i++) {
                let arg = String(arguments[i]);

                // Escape special characters in the substitution.
                s += arg.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                // Don't escape special characters in the template.
                s += templateData[i];
            }
            return s;
        }
    }

    {//多语言转换（蹩脚国际化处理）。

        let siteName = 'tpc';
        let visitorNumber = 1206;
        var lang = i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`;
        var lang1 = i18n`欢迎访问${siteName}，您是第${visitorNumber}位访问者！`;

        function i18n(literals, ...values) {
            let output = "";
            let index;
            for (index = 0; index < values.length; index++) {
                output += literals[index] + values[index];
            }

            output += literals[index]
            return output;
        }
        console.log(lang);
        console.log(lang1);
    }

    {//多语言转换（国际化处理）。
        // Matches optional type annotations in i18n strings.
        // e.g. i18n`This is a number ${x}:n(2)` formats x as number
        //      with two fractional digits.
        const typeInfoRegex = /^:([a-z])(\((.+)\))?/;

        let I18n = {
            use({ locale, defaultCurrency, messageBundle }) {
                I18n.locale = locale;
                I18n.defaultCurrency = defaultCurrency;
                I18n.messageBundle = messageBundle;
                return I18n.translate;
            },

            translate(strings, ...values) {
                let translationKey = I18n._buildKey(strings);
                let translationString = I18n.messageBundle[translationKey];

                if (translationString) {
                    let typeInfoForValues = strings.slice(1).map(I18n._extractTypeInfo);
                    let localizedValues = values.map((v, i) => I18n._localize(v, typeInfoForValues[i]));
                    return I18n._buildMessage(translationString, ...localizedValues);
                }

                return 'Error: translation missing!';
            },

            _localizers: {
                //string
                s: v => v.toLocaleString(I18n.locale),
                //currency
                c: (v, currency) => (
                    v.toLocaleString(I18n.locale, {
                        style: 'currency',
                        currency: currency || I18n.defaultCurrency
                    })
                ),
                //number
                n: (v, fractionalDigits) => (
                    v.toLocaleString(I18n.locale, {
                        minimumFractionDigits: fractionalDigits,
                        maximumFractionDigits: fractionalDigits
                    })
                )
            },

            _extractTypeInfo(str) {
                let match = typeInfoRegex.exec(str);
                if (match) {
                    return { type: match[1], options: match[3] };
                } else {
                    return { type: 's', options: '' };
                }
            },

            _localize(value, { type, options }) {
                return I18n._localizers[type](value, options);
            },

            // e.g. I18n._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
            _buildKey(strings) {
                let stripType = s => s.replace(typeInfoRegex, '');
                let lastPartialKey = stripType(strings[strings.length - 1]);
                let prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

                return strings.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
            },

            // e.g. I18n._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'
            _buildMessage(str, ...values) {
                return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
            }
        };
        let name = 'Bob';
        let amount = 1234.56;

        let messageBundle_fr = {
            'Hello {0}, you have {1} in your bank account.': 'Bonjour {0}, vous avez {1} dans votre compte bancaire.'
        };
        let messageBundle_de = {
            'Hello {0}, you have {1} in your bank account.': 'Hallo {0}, Sie haben {1} auf Ihrem Bankkonto'
        };
        let messageBundle_zh_Hant = {
            'Hello {0}, you have {1} in your bank account.': '你好{0}，你有{1}在您的銀行帳戶。'
        };

        i18n = I18n.use({ locale: 'fr-CA', defaultCurrency: 'CAD', messageBundle: messageBundle_fr });
        console.log(i18n`Hello ${name}, you have ${amount}:c in your bank account.`);
        // => 'Bonjour Bob, vous avez 1 234,56 $CA dans votre compte bancaire.'

        i18n = I18n.use({ locale: 'de-DE', defaultCurrency: 'EUR', messageBundle: messageBundle_de });
        console.log(i18n`Hello ${name}, you have ${amount}:c in your bank account.`);
        // => 'Hallo Bob, Sie haben 1.234,56 € auf Ihrem Bankkonto.'

        i18n = I18n.use({ locale: 'zh-Hant-CN', defaultCurrency: 'CNY', messageBundle: messageBundle_zh_Hant });
        console.log(i18n`Hello ${name}, you have ${amount}:c in your bank account.`);
        // => '你好Bob，你有￥1,234.56在您的銀行帳戶。'
    }
}

{//String.raw
    {
        var a = String.raw({ raw: 'test' }, 0, 1, 2);
        console.log(a);// 't0e1s2t'

        // 等同于
        var a = String.raw({ raw: ['t', 'e', 's', 't'] }, 0, 1, 2);
        console.log(a);// 't0e1s2t'
    }

    {

        var a = raw({ raw: 'test' }, 0, 1, 2);
        console.log(a);// 't0e1s2t'

        // 等同于
        var a = raw({ raw: ['t', 'e', 's', 't'] }, 0, 1, 2);
        console.log(a);// 't0e1s2t'

        //String.raw = function (strings, ...values) {
        //等同于
        function raw(strings, ...values) {
            let output = '';
            let index;
            for (index = 0; index < values.length; index++) {
                output += strings.raw[index] + values[index];
            }

            output += strings.raw[index]
            return output;
        }
    }
}