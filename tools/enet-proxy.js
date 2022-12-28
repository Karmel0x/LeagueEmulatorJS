//
//// need some changes in enetcppjs to make it working...
//
//const enet = require('../Core/enet');
////const Handlers = require('../Core/Handlers');
//const Packets = require('../Core/Packets');
//require("../Core/BufferExtend");
//
//
//async function init_client_nn() {
//	var enet_initialize = Boolean(enet.initialize_client(5119, "127.0.0.1", "17BLOhi6KZsTtldTsizvHg=="));
//	console.log('enet_initialize:', enet_initialize);
//	if (!enet_initialize)
//		return false;
//
//	//var q = {};
//	//while (true) {
//	//	q = enet.netLoop();
//	//	if (typeof q.type == 'undefined') {//no packets atm
//	//		await Promise.wait(1);//don't overload cpu
//	//		continue;
//	//	}
//	//
//	//	if (q.type == enet.ENET_EVENT_TYPE_RECEIVE) {
//	//		init_network_handler(q);
//	//	}
//	//}
//}
//
//var _init_network_handler = false;
//async function init_network_handler(q) {
//	if (!_init_network_handler) {
//		_init_network_handler = true;
//		await init_client_nn();
//		await Promise.wait(100);
//	}
//	console.log(q.peer_num, q.channel || 0, q.peer_num == 0 ? '(client)' : '(server)', q.buffer);
//
//	enet.sendPacket(q.peer_num == 0 ? 1 : 0, q.buffer, q.channel || 0);
//}
//
//require('../Core/init_utilities')();
//require('../Core/Network/libs/enet')({ port: 5118, host: "127.0.0.1", blowfishKey: "17BLOhi6KZsTtldTsizvHg==" }, init_network_handler);
//
//
////async function t1() {
////	var keyExchangePacket = '00 72 93 03 00 00 00 00 01 00 00 00 00 00 00 00 bb df 80 02 16 6a df 67 50 b9 27 f6 70 e9 36 0a';
////	//var keyExchangePacket = '00 2a 00 ff 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';
////	keyExchangePacket = keyExchangePacket.split(' ').join('');
////	var buffer = Buffer.from(keyExchangePacket, 'hex');
////	console.log(buffer);
////	enet.sendPacket(0, buffer, 0);
////	await Promise.wait(1000);
////}
////async function t() {
////	init_client_nn();
////	await Promise.wait(100);
////	await t1();
////}
////
////t();
//