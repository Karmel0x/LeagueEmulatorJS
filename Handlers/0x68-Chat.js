
const { Vector2, Vector3 } = require('three');


function chatBoxMessage(target, message){
	
    var Chat = global.Network.createPacket('Chat', 'COMMUNICATION');
	
	Chat.msg = message;
	Chat.messageSize = message.length;

	Chat.netId = target.netId;
    target.sendPacket(Chat);
	console.debug(Chat);
}

var lastCommand = '';


module.exports = (player, packet) => {
    console.log('handle: COMMUNICATION.Chat');
	//console.log(packet);


    var Chat = global.Network.createPacket('Chat', 'COMMUNICATION');
	Object.assign(Chat, packet);
	Chat.netId = player.netId;
    player.sendPacket(Chat);
	console.debug(Chat);

    //var DEBUG_MESSAGE = global.Network.createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = player.netId;
	//DEBUG_MESSAGE.msg = packet.msg;
    //player.sendPacket(DEBUG_MESSAGE);
    

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
				.start :: starting game (start spawning minions)
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
				.pathfinding [<1/0>] :: turning pathfinding on/off
				.setCharacter <characterName>
				.stats :: prints unit stats
				.gold :: sets unit gold
			`;
				//.debugMode [<debugLevel(0/1)>] :: turning off/on debug mode (debug logs)
			chatBoxMessage(player, message.split('\t\t').join(' '));
		}
		else if(commandArgs[0] === 'q'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				global.Barracks['BLUE'][0].spawnUnit('Basic');
				global.Barracks['RED'][0].spawnUnit('Basic');
				//await Promise.wait(2);
			}
		}
		else if(commandArgs[0] === 'spawnMinion'){
			var teamName = (commandArgs[1] || player.getEnemyTeam()).toUpperCase();
			player.chatBoxMessage('spawnMinion', teamName);
			global.Barracks[teamName][0].spawnUnit('Basic', {spawnPosition: player.position});
		}
		else if(commandArgs[0] === 'qq'){
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				global.Barracks['RED'][0].spawnUnit('Basic').teleport(new Vector2(1000 + (i * 150), 600));
			}
		}
		else if(commandArgs[0] === 'qqq'){
			var characters = [
				'Basic', 'MechCannon', 'Wizard', 'MechMelee', //'MechRange',
			];
			var j = parseInt(commandArgs[2] || 0);
			for(let i = parseInt(commandArgs[1] || 1); i > 0; i--){
				global.Barracks['RED'][0].spawnUnit(characters[j]).teleport(new Vector2(1000 + (i * 150), 600));
			}
		}
		else if(commandArgs[0] === 'start'){
			global.command_START_GAME = true;
			player.chatBoxMessage('starting game');
		}
		else if(commandArgs[0] === 'ww'){
			var pos = new Vector2(10200, 13200);
			var redMinionUnits = global.getUnitsF('RED', 'Minion');
			for(let i in redMinionUnits)
				redMinionUnits[i].move1(pos.clone());
		}
		//else if(commandArgs[0] === 'ee'){
		//	player.attack(global.units[1]);
		//	global.units[1].attack(player);
		//}
		else if(commandArgs[0] === 'e'){
			var OnReplication = global.Network.createPacket('OnReplication', 'LOW_PRIORITY');
			OnReplication.units = [player];
			player.sendPacket(OnReplication);
			//console.log(OnReplication);
			
			//var OnReplication = global.Network.createPacket('OnReplication', 'LOW_PRIORITY');
			//OnReplication.syncId = performance.now();
			//OnReplication.units = [global.units[0]];
			//player.sendPacket(OnReplication);
			//console.log(OnReplication);
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
		else if(commandArgs[0] == 'packetInspector'){
			global.Logging.changeOptions({
				packet: Logging.output.websocket,
			});
		}
		else if(commandArgs[0] == 'levelup'){
			var levelCount = parseInt(commandArgs[1] || 1);
			for(let i = levelCount; i > 0; i--)
				player.levelUp();

			player.chatBoxMessage('levelup:', levelCount);
		}
		else if(commandArgs[0] == 'expup'){
			var expCount = parseInt(commandArgs[1] || 1);
			player.expUp(expCount);
			player.chatBoxMessage('expup:', expCount);
		}
		else if(commandArgs[0] == 'hp'){
			var hpPercent = parseInt(commandArgs[1] || 100);
			player.health.current = player.health.total * hpPercent / 100;
			player.OnEnterLocalVisibilityClient();
		}
		else if(commandArgs[0] == 'test'){
			for(let i = 22; i > 0; i--)
				global.Barracks['RED'][0].spawnUnit('Basic').teleport(new Vector2(1000 + (i * 150), 600));

			for(let i = 5; i > 0; i--)
				player.levelUp();
		}
		else if(commandArgs[0] == 'champion'){
			var character = commandArgs[1] || 'Ezreal';
			const Champion_ = require('../Game/LeagueData/Characters/' + character);
			player.character = new Champion_(player);
			player.ChangeCharacterData(character);
			player.chatBoxMessage('switching champion to:', character);
		}
		else if(commandArgs[0] == 'info'){
			if(!commandArgs[1]){
				player.chatBoxMessage('possible info types: position, stats');
			}
			else if(commandArgs[1] == 'position'){
				console.log(commandArgs, player.position);
				player.chatBoxMessage(...commandArgs, player.position.x, player.position.y);
			}
			else if(commandArgs[1] == 'stats'){
				var message = '';
				for(var i in player.baseStats)
					if(player[i])
						message += ` | ${i}: ${player[i].total}`;
	
				player.chatBoxMessage(message);
			}
		}
		else if(commandArgs[0] == 'goto'){
			// teleport to unit by netId
			var netId = parseInt(commandArgs[1] || 0);
			var unit = global.getUnitByNetId(netId);
			if(unit){
				player.teleport(unit.position);
			}
			player.chatBoxMessage('teleporting player to ', unit.constructor.name, netId, '-', unit.position.x, unit.position.y);
		}
		else if(commandArgs[0] == 'pathfinding'){
			if(!commandArgs[1]){
				global.doNotUsePathfinding = !global.doNotUsePathfinding;
			}
			if(commandArgs[1] == '0'){
				global.doNotUsePathfinding = true;
			}
			else if(commandArgs[1] == '1'){
				global.doNotUsePathfinding = false;
			}
			else if(commandArgs[1] == '2'){
				global.useTerrainEscape = !global.useTerrainEscape;
				player.chatBoxMessage('global.useTerrainEscape:', !!global.useTerrainEscape);
			}
			player.chatBoxMessage('global.doNotUsePathfinding:', !!global.doNotUsePathfinding);
		}
		else if(commandArgs[0] == 'setCharacter'){
			player.character = commandArgs[1] || 'Ezreal';
		}
		else if(commandArgs[0] == 'SystemMessage'){
			let packet = global.Network.createPacket('SystemMessage');
			packet.message = commandArgs.join(' ');
			player.sendPacket(packet);
		}
		else if(commandArgs[0] == 'gold'){
			player.gold = parseInt(commandArgs[1] || 10000);
			player.chatBoxMessage(...commandArgs);
		}
		else if(commandArgs[0] == 'mm'){
			let packet = global.Network.createPacket('UnitAddGold');
			//packet.netId = player.netId;
			packet.targetNetId = player.netId;
			packet.sourceNetId = player.netId;
			packet.goldAmount = 111;
			player.sendPacket(packet);
		}

	}
};
