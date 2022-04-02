
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require("../Constants/loadingStages");

const Game = require('../Game/Initializers/Game');

var spawned = false;

module.exports = (player, packet) => {
	console.log('handle: C2S.CHAR_LOADED');
	//console.log(packet);

	
	var START_SPAWN = createPacket('START_SPAWN');
	var isSent = player.sendPacket(START_SPAWN, loadingStages.NOT_CONNECTED);
	
	if(!spawned){//temporary here
		spawned = true;
		Game.loaded();
	}
	player.sendReconnectPackets();


	//var SKILL_UP = createPacket('SKILL_UP');
	//SKILL_UP.Slot = 13;
	//SKILL_UP.SpellLevel = 1;
	//SKILL_UP.SkillPoints = 1;
	//var isSent = player.sendPacket(SKILL_UP);

	
	// -----
	var END_SPAWN = createPacket('END_SPAWN');
	var isSent = player.sendPacket(END_SPAWN, loadingStages.NOT_CONNECTED);
	
	//var BUY_ITEM_ANS = createPacket('BUY_ITEM_ANS');
	//var isSent = player.sendPacket(BUY_ITEM_ANS);

};
