
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const Minion = require("../Classes/Units/Minion");


module.exports = function(q, obj1){
    console.log('handle: COMMUNICATION.CHAT_BOX_MESSAGE');
	console.log(obj1);


    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	Object.assign(CHAT_BOX_MESSAGE, obj1);
	CHAT_BOX_MESSAGE.netId = global.Players[0].netId;
    var isSent = sendPacket(CHAT_BOX_MESSAGE);
	console.log(CHAT_BOX_MESSAGE);

    //var DEBUG_MESSAGE = createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = global.Players[0].netId;
	//DEBUG_MESSAGE.msg = obj1.msg;
    //var isSent = sendPacket(DEBUG_MESSAGE);
    

	if(obj1.msg[0] === '.'){
		let command = obj1.msg.slice(1);
		let commandArgs = command.split(' ');

		if(commandArgs[0] === 'q'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				new Minion('BLUE', 'MALEE', 0);
				new Minion('RED', 'MALEE', 0);
				//await global.Utilities.wait(2);
			}
		}
		else if(commandArgs[0] === 'w'){
			global.command_START_GAME = true;
		}
		else if(commandArgs[0] === 'ee'){
			global.Players[0].battle.attack(global.Units[1]);
			global.Units[1].battle.attack(global.Players[0]);
		}
		else if(commandArgs[0] === 'e'){
			var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			CHAR_STATS.SyncID = performance.now();
			CHAR_STATS.units = [global.Players[0]];
			var isSent = sendPacket(CHAR_STATS);
			//console.log(CHAR_STATS);
			
			//var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			//CHAR_STATS.SyncID = performance.now();
			//CHAR_STATS.units = [global.Units[0]];
			//var isSent = sendPacket(CHAR_STATS);
			//console.log(CHAR_STATS);
		}
		else if(commandArgs[0] === 'r'){
			if(command.length > 1){
				let s = command.split('/');
				global.Players[0].stats[s[1]] = JSON.parse(s[2]);
			}else{
				delete require.cache[require.resolve('../Constants/TestStats.json')];
				Object.assign(global.Players[0].stats, require('../Constants/TestStats.json'));
			}
		}
		else if(commandArgs[0] == 'levelup'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--)
				global.Players[0].stats.levelUp();
		}
		else if(commandArgs[0] == 'expup'){
			global.Players[0].stats.expUp(parseInt(commandArgs[1] || 1));
		}

	}
};
