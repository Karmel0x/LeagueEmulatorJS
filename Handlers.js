
const Packets = require("./Packets");
const {createPacket, sendPacket} = require("./PacketUtilities");


function handle1(q){

}


var Handlers = {
    0x00: {handler: require('./Handlers/0x00-KEY_CHECK.js')},
    0x01: {handler: handle1},
    0x14: {handler: require('./Handlers/0x14-C2S_QUERY_STATUS_REQ.js')},
    0xBD: {handler: require('./Handlers/0xBD-C2S_SYNCH_VERSION.js')},
    0x64: {handler: require('./Handlers/0x64-C2S_CLIENT_READY.js')},
    0x16: {handler: require('./Handlers/0x16-C2S_PING_LOAD_INFO.js')},
    0xBE: {handler: require('./Handlers/0xBE-C2S_CHAR_LOADED.js')},
    0x52: {handler: require('./Handlers/0x52-C2S_START_GAME.js')},
    0x2E: {handler: require('./Handlers/0x2E-C2S_VIEW_REQ.js')},
    0x72: {handler: require('./Handlers/0x72-C2S_MOVE_REQ.js')},
    0x77: {handler: require('./Handlers/0x77-C2S_MOVE_CONFIRM.js')},
    0x8F: {handler: require('./Handlers/0x8F-C2S_EXIT.js')},
    0x81: {handler: require('./Handlers/0x81-C2S_LOCK_CAMERA.js')},
    0x39: {handler: require('./Handlers/0x39-C2S_SKILL_UPGRADE.js')},
    0x56: {handler: require('./Handlers/0x56-C2S_SCOREBOARD.js')},
    0x48: {handler: require('./Handlers/0x48-C2S_EMOTION.js')},
    0x57: {handler: require('./Handlers/0x57-C2S_ATTENTION_PING.js')},
};


module.exports = async function(q){
	
	var obj1 = q.packet.readobj(Packets.Header);
	q.packet.off = 0;
	console.log('recv:', obj1.cmd, Packets.ids[obj1.cmd], q);
	Packets.netId = obj1.netId;

	try {
		if(typeof Handlers[obj1.cmd] == 'undefined' || typeof Handlers[obj1.cmd].handler == 'undefined')
			return console.log('packet handler not implemented yet', obj1.cmd);

		Handlers[obj1.cmd].handler(q);
	}catch(e){
		console.log(e.stack);
	}
	
	
	//const buff = Buffer.from('test');
	//var enet_sendPacket = enet.sendPacket(buff).toString();
	//console.log('enet_sendPacket: ' + enet_sendPacket);
};
