const HandlersParse = require("./HandlersParse");

function handle1(q){

}


var Handlers = {
    0x00: {handler: require('./Handlers/0x00-KEY_CHECK.js')},
    //0x01: {handler: handle1},
    0x14: {handler: require('./Handlers/0x14-QUERY_STATUS_REQ.js')},
    0xBD: {handler: require('./Handlers/0xBD-SYNCH_VERSION.js')},
    0x64: {handler: require('./Handlers/0x64-CLIENT_READY.js')},
    0x16: {handler: require('./Handlers/0x16-PING_LOAD_INFO.js')},
    0xBE: {handler: require('./Handlers/0xBE-CHAR_LOADED.js')},
    0x52: {handler: require('./Handlers/0x52-START_GAME.js')},
    0x2E: {handler: require('./Handlers/0x2E-VIEW_REQ.js')},
    0x72: {handler: require('./Handlers/0x72-MOVE_REQ.js')},
    0x77: {handler: require('./Handlers/0x77-MOVE_CONFIRM.js')},
    0x8F: {handler: require('./Handlers/0x8F-EXIT.js')},
    0x81: {handler: require('./Handlers/0x81-LOCK_CAMERA.js')},
    0x39: {handler: require('./Handlers/0x39-SKILL_UPGRADE.js')},
    0x56: {handler: require('./Handlers/0x56-SCOREBOARD.js')},
    0x48: {handler: require('./Handlers/0x48-EMOTION.js')},
    0x57: {handler: require('./Handlers/0x57-ATTENTION_PING.js')},
    0x68: {handler: require('./Handlers/0x68-CHAT_BOX_MESSAGE.js')},
    0x47: {handler: require('./Handlers/0x47-AUTO_ATTACK_OPTION.js')},
    0x08: {handler: require('./Handlers/0x08-HEART_BEAT.js')},
};

module.exports = async function(q){
	
	//console.log('recv:' + q.packet.toString('hex').match(/../g).join('-'));
	var obj1 = HandlersParse.parsePacket(q);
	//console.log(obj1);

	try {
		if(typeof Handlers[obj1.cmd] == 'undefined' || typeof Handlers[obj1.cmd].handler == 'undefined')
			return console.log('packet handler not implemented yet :', obj1.cmd.toString(16));

		Handlers[obj1.cmd].handler(q, obj1);
	}catch(e){
		console.log(e.stack);
	}
	
	
	//const buff = Buffer.from('test');
	//var enet_sendPacket = enet.sendPacket(buff).toString();
	//console.log('enet_sendPacket: ' + enet_sendPacket);
};
