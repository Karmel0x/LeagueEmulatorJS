
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');

const Minion = require("../Game/Units/Minion");
const { Vector2 } = require('three');

function chatBoxMessage(target, message){
	
    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	
	CHAT_BOX_MESSAGE.msg = message;
	CHAT_BOX_MESSAGE.messageSize = message.length;

	CHAT_BOX_MESSAGE.netId = target.netId;
    var isSent = target.sendPacket(CHAT_BOX_MESSAGE);
	console.debug(CHAT_BOX_MESSAGE);
}

var lastCommand = '';

module.exports = (player, packet) => {
    console.log('handle: COMMUNICATION.CHAT_BOX_MESSAGE');
	//console.log(packet);


    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	Object.assign(CHAT_BOX_MESSAGE, packet);
	CHAT_BOX_MESSAGE.netId = player.netId;
    var isSent = player.sendPacket(CHAT_BOX_MESSAGE);
	console.debug(CHAT_BOX_MESSAGE);

    //var DEBUG_MESSAGE = createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = player.netId;
	//DEBUG_MESSAGE.msg = packet.msg;
    //var isSent = player.sendPacket(DEBUG_MESSAGE);
    

	if(packet.msg === '.')
		packet.msg = lastCommand;
	lastCommand = packet.msg;
	
	if(packet.msg[0] === '.'){
		let command = packet.msg.slice(1);
		let commandArgs = command.split(' ');

		if(commandArgs[0] === 'help'){
			var message = `
				Available commands:
				.q [<minionsAmount>] :: spawning BLUE and RED minions
				.qq [<minionsAmount>] :: spawning RED minion and teleports to BLUE base
				.w :: starting game (start spawning minions)
				.r :: reading player stats from '/Constants/TestStats.json'
				.e :: sending player stats to client
				.levelup [<levelAmount>] :: adding levels for player
				.expup [<expAmount>] :: adding experience for player
				.hp [<percent>] :: setting player health
				.test :: levelingUp player 5 levels and spawning 22 RED minions in BLUE base
				.champion <championName> :: switching player champion
				.info <type(position)> :: printing in console some informations you may need
				.goto <netId> :: teleporting to unit with netId
				. :: run last command again
			`;
				//.debugMode [<debugLevel(0/1)>] :: turning off/on debug mode (debug logs)
			chatBoxMessage(player, message.split('\t\t').join(' '));
		}
		else if(commandArgs[0] === 'q'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				global.Barracks['BLUE'][0].spawnUnit('Basic');
				global.Barracks['RED'][0].spawnUnit('Basic');
				//await global.Utilities.wait(2);
			}
		}
		else if(commandArgs[0] === 'qq'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				global.Barracks['RED'][0].spawnUnit('Basic').Movement.teleport(new Vector2(1000 + (i * 150), 600));
			}
		}
		else if(commandArgs[0] === 'w'){
			global.command_START_GAME = true;
		}
		else if(commandArgs[0] === 'ww'){
			var pos = new Vector2(10200, 13200);
			var redMinionUnits = global.getUnitsF('RED', 'Minion');
			for(let i in redMinionUnits)
				redMinionUnits[i].Movement.move1(pos.clone());
		}
		//else if(commandArgs[0] === 'ee'){
		//	player.battle.attack(global.units[1]);
		//	global.units[1].battle.attack(player);
		//}
		else if(commandArgs[0] === 'e'){
			var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			CHAR_STATS.units = [player];
			var isSent = player.sendPacket(CHAR_STATS);
			//console.log(CHAR_STATS);
			
			//var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
			//CHAR_STATS.SyncID = performance.now();
			//CHAR_STATS.units = [global.units[0]];
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
		//else if(commandArgs[0] == 'debugMode'){
		//	let debugLevel = parseInt(commandArgs[1] || '');
		//	if(isNaN(debugLevel))
		//		debugLevel = 1;
		//
		//	//global.debugLevel = debugLevel;
		//
		//	if(debugLevel == 0){
		//		console.debug_mp = console.debug_mp || console.debug;
		//		console.debug = () => {};
		//	}
		//	else if(debugLevel == 1){
		//		console.debug_mp = console.debug_mp || console.debug;
		//		console.debug = console.debug_mp || console.debug;
		//	}
		//}
		else if(commandArgs[0] == 'levelup'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--)
				player.stats.levelUp();
		}
		else if(commandArgs[0] == 'expup'){
			player.stats.expUp(parseInt(commandArgs[1] || 1));
		}
		else if(commandArgs[0] == 'hp'){
			var hpPercent = parseInt(commandArgs[1] || 100);
			player.stats.CurrentHealth = player.stats.HealthPoints.Total * hpPercent / 100;
			player.SET_HEALTH();
		}
		else if(commandArgs[0] == 'test'){
			for(let i = 22; i > 0; i--)
				global.Barracks['RED'][0].spawnUnit('Basic').Movement.teleport(new Vector2(1000 + (i * 150), 600));

			for(let i = 5; i > 0; i--)
				player.stats.levelUp();
		}
		else if(commandArgs[0] == 'champion'){
			var character = commandArgs[1] || 'Ezreal';
			const Champion_ = require('../Game/League/Characters/Champions/' + character);
			player.character = new Champion_(player);
			player.UPDATE_MODEL(character);
		}
		else if(commandArgs[0] == 'info'){
			if(commandArgs[1] == 'position'){
				console.log(commandArgs, player.position);
			}
		}
		else if(commandArgs[0] == 'goto'){
			// teleport to unit by netId
			var netId = parseInt(commandArgs[1] || 0);
			var unit = global.getUnitByNetId(netId);
			if(unit){
				player.Movement.teleport(unit.position);
			}
		}

	}
};
