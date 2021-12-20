
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require('../Constants/loadingStages');
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.START_GAME');
	//console.log(packet);

	player.loadingStage = loadingStages.IN_GAME;

	Game.loaded(player);

	
	for(var allyUnit_id in global.Units['BLUE']['ALL'])
		global.Teams['BLUE'].vision(global.Units['BLUE']['ALL'][allyUnit_id], true);// todo
	for(var allyUnit_id in global.Units['RED']['ALL'])
		global.Teams['RED'].vision(global.Units['RED']['ALL'][allyUnit_id], true);// todo

};
