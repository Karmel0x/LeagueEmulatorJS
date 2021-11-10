const HandlersParse = require("./HandlersParse");
const { logPackets } = require("./PacketUtilities");

function handle1(q){

}


var Handlers = {
	0x00: {handler: require('./Handlers/0x00-KEY_CHECK')},
	0x05: {handler: require('./Handlers/0x05-TutorialAudioEventFinished')},
	0x09: {handler: require('./Handlers/0x09-SELL_ITEM')},
	0x0A: {handler: require('./Handlers/0x0A-UNPAUSE_GAME')},
	0x14: {handler: require('./Handlers/0x14-QUERY_STATUS_REQ')},
	0x16: {handler: require('./Handlers/0x16-PING_LOAD_INFO')},
	0x1D: {handler: require('./Handlers/0x1D-WriteNavFlags_Acc')},
	0x20: {handler: require('./Handlers/0x20-SWAP_ITEMS')},
	0x2E: {handler: require('./Handlers/0x2E-VIEW_REQ')},
	0x39: {handler: require('./Handlers/0x39-SKILL_UPGRADE')},
	0x3A: {handler: require('./Handlers/0x3A-USE_OBJECT')},
	0x47: {handler: require('./Handlers/0x47-AUTO_ATTACK_OPTION')},
	0x48: {handler: require('./Handlers/0x48-EMOTION')},
	0x49: {handler: require('./Handlers/0x49-PlayVOCommand')},
	0x4B: {handler: require('./Handlers/0x4B-OnScoreBoardOpened')},
	0x52: {handler: require('./Handlers/0x52-START_GAME')},
	0x56: {handler: require('./Handlers/0x56-SCOREBOARD')},
	0x57: {handler: require('./Handlers/0x57-ATTENTION_PING')},
	0x5D: {handler: require('./Handlers/0x5D-OnShopOpened')},
	0x6D: {handler: require('./Handlers/0x6D-BLUE_TIP_CLICKED')},
	0x72: {handler: require('./Handlers/0x72-MOVE_REQ')},
	0x77: {handler: require('./Handlers/0x77-MOVE_CONFIRM')},
	0x81: {handler: require('./Handlers/0x81-LOCK_CAMERA')},
	0x82: {handler: require('./Handlers/0x82-BUY_ITEM_REQ')},
	0x8D: {handler: require('./Handlers/0x8D-ClientFinished')},
	0x8F: {handler: require('./Handlers/0x8F-EXIT')},
	0x92: {handler: require('./Handlers/0x92-WORLD_SEND_GAME_NUMBER')},
	0x9A: {handler: require('./Handlers/0x9A-CAST_SPELL')},
	0x9C: {handler: require('./Handlers/0x9C-SoftReconnect')},
	0xA1: {handler: require('./Handlers/0xA1-PAUSE_GAME')},
	0xA4: {handler: require('./Handlers/0xA4-SURRENDER')},
	0xA8: {handler: require('./Handlers/0xA8-STATS_CONFIRM')},
	0xAF: {handler: require('./Handlers/0xAF-CLICK')},
	0xBD: {handler: require('./Handlers/0xBD-SYNCH_VERSION')},
	0xBE: {handler: require('./Handlers/0xBE-CHAR_LOADED')},
	0xCC: {handler: require('./Handlers/0xCC-OnTutorialPopupClosed')},
	0xCD: {handler: require('./Handlers/0xCD-QUEST_CLICKED')},
	0xD6: {handler: require('./Handlers/0xD6-OnRespawnPointEvent')},
	0xE6: {handler: require('./Handlers/0xE6-SPELL_CHARGE_UPDATE')},
	0xEA: {handler: require('./Handlers/0xEA-SpectatorDataReq')},
	0xF4: {handler: require('./Handlers/0xF4-PlayContextualEmote')},
	0xFB: {handler: require('./Handlers/0xFB-TeamBalanceVote')},
	0x0106: {handler: require('./Handlers/0x0106-UnitSendDrawPath')},
	0x010A: {handler: require('./Handlers/0x010A-UndoItemReq')},
	0x011B: {handler: require('./Handlers/0x011B-CheatLogGoldSources')},

	0x08: {handler: require('./Handlers/0x08-HEART_BEAT')},
	0x64: {handler: require('./Handlers/0x64-CLIENT_READY')},
	0x68: {handler: require('./Handlers/0x68-CHAT_BOX_MESSAGE')},
};

module.exports = async function(q){
	logPackets(q);

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
