/**
 * 唐鹏程
 * 测试socket。io
 */
var io = require('socket.io');


var tpc_im = {}

tpc_im.create = function (server) {
	console.log("开始监听socket----------------------------------------------------------11111111111111111111111111111111111111");
	tpc_im.io = io.listen(server);
}

module.exports = tpc_im;