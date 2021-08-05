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
    0xA8: {handler: require('./Handlers/0xA8-STATS_CONFIRM.js')},
    0x9A: {handler: require('./Handlers/0x9A-CAST_SPELL.js')},
    0xAF: {handler: require('./Handlers/0xAF-CLICK.js')},
};

module.exports = async function(q){
	
	//console.log('recv:' + q.buffer.toString('hex').match(/../g).join('-'));
    var player = q.peer_num;
    if(q.channel){// not HANDSHAKE
        var clientId = global.PlayerPeers[q.peer_num];
        player = global.Units['ALL'].Player[clientId];
    }
	var packet = HandlersParse.parsePacket(q);
	console.debug('channel:', q.channel || 0, 'peer_num:', q.peer_num, 'packet:', packet);

	try {
		if(typeof Handlers[packet.cmd] == 'undefined' || typeof Handlers[packet.cmd].handler == 'undefined')
			return console.log('packet handler not implemented yet :', packet.cmd.toString(16));

		Handlers[packet.cmd].handler(player, packet);
	}catch(e){
		console.log(e.stack);
	}

};
