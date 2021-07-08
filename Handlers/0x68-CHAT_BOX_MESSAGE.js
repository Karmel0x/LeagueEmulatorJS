
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const Minion = require("../Classes/Units/Minion");
const { Vector2 } = require('three');

module.exports = (player, packet) => {
    console.log('handle: COMMUNICATION.CHAT_BOX_MESSAGE');
	//console.log(packet);


    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	Object.assign(CHAT_BOX_MESSAGE, packet);
	CHAT_BOX_MESSAGE.netId = player.netId;
    var isSent = player.sendPacket(CHAT_BOX_MESSAGE);
	console.log(CHAT_BOX_MESSAGE);

    //var DEBUG_MESSAGE = createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = player.netId;
	//DEBUG_MESSAGE.msg = packet.msg;
    //var isSent = player.sendPacket(DEBUG_MESSAGE);
    

	if(packet.msg[0] === '.'){
		let command = packet.msg.slice(1);
		let commandArgs = command.split(' ');

		if(commandArgs[0] === 'q'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				new Minion('BLUE', 'MALEE', 0);
				new Minion('RED', 'MALEE', 0);
				//await global.Utilities.wait(2);
			}
		}
		else if(commandArgs[0] === 'qq'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				new Minion('RED', 'MALEE', 0).teleport(new Vector2(200, 200));
			}
		}
		else if(commandArgs[0] === 'w'){
			global.command_START_GAME = true;
		}
		else if(commandArgs[0] === 'ee'){
			player.battle.attack(global.Units[1]);
			global.Units[1].battle.attack(player);
		}
		else if(commandArgs[0] === 'e'){
			var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			CHAR_STATS.SyncID = performance.now();
			CHAR_STATS.units = [player];
			var isSent = player.sendPacket(CHAR_STATS);
			//console.log(CHAR_STATS);
			
			//var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			//CHAR_STATS.SyncID = performance.now();
			//CHAR_STATS.units = [global.Units[0]];
			//var isSent = player.sendPacket(CHAR_STATS);
			//console.log(CHAR_STATS);
		}
		else if(commandArgs[0] === 'r'){
			if(command.length > 1){
				let s = command.split('/');
				player.stats[s[1]] = JSON.parse(s[2]);
			}else{
				delete require.cache[require.resolve('../Constants/TestStats.json')];
				Object.assign(player.stats, require('../Constants/TestStats.json'));
			}
		}
		else if(commandArgs[0] == 'levelup'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--)
				player.stats.levelUp();
		}
		else if(commandArgs[0] == 'expup'){
			player.stats.expUp(parseInt(commandArgs[1] || 1));
		}

	}
};
