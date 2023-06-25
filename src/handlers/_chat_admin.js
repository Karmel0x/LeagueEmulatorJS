
const { Vector2 } = require('three');
const UnitList = require('../app/UnitList');
const Server = require('../app/Server');


const commandList = {
	'a': {
		description: 'test command',
		arguments: [],
		handler: function (player, args) {
			player.chatBoxMessage(...args);

		}
	},
	'help': {
		description: 'shows available admin commands',
		arguments: [],
		handler: function (player, args) {

			var messages = [];
			for (let commandName in commandList) {
				let command = commandList[commandName];

				let commandLine = '.' + commandName;
				if (command.arguments && command.arguments.length)
					commandLine += ' ' + command.arguments.join(' ');
				if (command.description)
					commandLine += ' :: ' + command.description;

				if (!messages[messages.length - 1] || (messages[messages.length - 1].length + commandLine.length) > 255)
					messages.push('');

				messages[messages.length - 1] += "\n" + commandLine;
			}

			messages.forEach((message, i) => {
				var HandleQuestUpdate = Server.network.createPacket('HandleQuestUpdate');
				HandleQuestUpdate.objective = `admin commands ${i + 1}`;
				HandleQuestUpdate.tooltip = message.slice(0, 128);
				HandleQuestUpdate.reward = message.slice(128, 257);
				HandleQuestUpdate.questType = Math.floor(i / 3);
				HandleQuestUpdate.questId = i;
				player.sendPacket(HandleQuestUpdate);
			});
		}
	},
	'': {
		description: 'run last command',
	},
	'q': {
		description: 'spawn BLUE and RED minions',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || 1); i > 0; i--) {
				UnitList.barracks['BLUE'][0].spawnUnit('Basic');
				UnitList.barracks['RED'][0].spawnUnit('Basic');
				//await Promise.wait(2);
			}
		},
	},
	'spawnMinion': {
		description: '',
		arguments: ['teamName'],
		handler: function (player, args) {
			var teamName = (args[1] || player.getEnemyTeam()).toUpperCase();
			player.chatBoxMessage('spawnMinion', teamName);
			UnitList.barracks[teamName][0].spawnUnit('Basic', { spawnPosition: player.position });
		},
	},
	'qq': {
		description: 'spawn RED minion and teleport to BLUE base',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || 1); i > 0; i--) {
				UnitList.barracks['RED'][0].spawnUnit('Basic').teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'qqq': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			var characters = [
				'Basic', 'MechCannon', 'Wizard', 'MechMelee', //'MechRange',
			];
			var j = parseInt(args[2] || 0);
			for (let i = parseInt(args[1] || 1); i > 0; i--) {
				UnitList.barracks['RED'][0].spawnUnit(characters[j]).teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'start': {
		description: 'start game (start spawning minions)',
		arguments: [],
		handler: function (player, args) {
			Server.command_START_GAME = true;
			player.chatBoxMessage('starting game');
		},
	},
	'ww': {
		description: 'move all RED minions to x: 10200, y: 13200',
		arguments: [],
		handler: function (player, args) {
			var pos = new Vector2(10200, 13200);
			var redMinionUnits = UnitList.getUnitsF('RED', 'Minion');
			for (var i = 0, l = redMinionUnits.length; i < l; i++)
				redMinionUnits[i].move1(pos.clone());
		},
	},
	//'ee': {
	//	description: '',
	//	arguments: [],
	//	handler: function (player, args) {
	//		player.attack(UnitList.units[1]);
	//		UnitList.units[1].attack(player);
	//	},
	//},
	'e': {
		description: 'resend player stats to client',
		arguments: [],
		handler: function (player, args) {
			var OnReplication = Server.network.createPacket('OnReplication', 'LOW_PRIORITY');
			//OnReplication.syncId = performance.now();
			//OnReplication.units = [UnitList.units[0]];
			OnReplication.units = [player];
			player.sendPacket(OnReplication);
			//console.log(OnReplication);
		},
	},
	'r': {
		description: `read player stats from '/constants/TestStats.json'`,
		arguments: [],
		handler: function (player, args) {
			if (command.length > 1) {
				let s = command.split('/');
				player.stats[s[1]] = JSON.parse(s[2]);
			} else {
				delete require.cache[require.resolve('../constants/TestStats.json')];
				Object.assign(player.stats, require('../constants/TestStats.json'));
			}
		},
	},
	//'debugMode': {
	//	description: '',
	//	arguments: [],
	//	handler: function (player, args) {
	//		let debugLevel = parseInt(args[1] || '');
	//		if (isNaN(debugLevel))
	//			debugLevel = 1;
	//
	//		//Server.debugLevel = debugLevel;
	//
	//		if (debugLevel == 0) {
	//			console.debug_mp = console.debug_mp || console.debug;
	//			console.debug = () => { };
	//		}
	//		else if (debugLevel == 1) {
	//			console.debug_mp = console.debug_mp || console.debug;
	//			console.debug = console.debug_mp || console.debug;
	//		}
	//	},
	//},
	'packetInspector': {
		description: '',
		arguments: ['websocket/console/none'],
		handler: function (player, args) {
			Server.logging.changeOptions({
				packet: Server.logging.output[args[1]] || Server.logging.output.websocket,
			});
			player.chatBoxMessage(`packet logging: ${Server.logging.options.packet.name}`);
		},
	},
	'levelup': {
		description: 'levelup current player',
		arguments: ['levelCount'],
		handler: function (player, args) {
			var levelCount = parseInt(args[1] || 1);
			for (let i = levelCount; i > 0; i--)
				player.levelUp();

			player.chatBoxMessage('levelup:', levelCount);
		},
	},
	'expup': {
		description: 'add experience for current player',
		arguments: ['expAmount'],
		handler: function (player, args) {
			var expCount = parseInt(args[1] || 1);
			player.expUp(expCount);
			player.chatBoxMessage('expup:', expCount);
		},
	},
	'hp': {
		description: 'set current player health',
		arguments: ['hpPercent'],
		handler: function (player, args) {
			var hpPercent = parseInt(args[1] || 100);
			player.health.current = player.health.total * hpPercent / 100;
			player.OnEnterLocalVisibilityClient();
		},
	},
	'test': {
		description: 'levelUp player 5 levels and spawn 22 RED minions in BLUE base',
		arguments: [],
		handler: function (player, args) {
			for (let i = 22; i > 0; i--) {
				var unit = UnitList.barracks['RED'][0].spawnUnit('Basic');
				//unit.moveLane = () => {};
				unit.teleport(new Vector2(1000 + (i * 150), 600));
			}

			for (let i = 5; i > 0; i--)
				player.levelUp();
		},
	},
	'champion': {
		description: 'switch player champion',
		arguments: ['championName'],
		handler: function (player, args) {
			var character = args[1] || 'Ezreal';
			const Champion_ = require('../game/leaguedata/characters/' + character);
			player.character = new Champion_(player);
			player.ChangeCharacterData(character);
			player.chatBoxMessage('switching champion to:', character);
		},
	},
	'info': {
		description: 'print in chat some informations you may need',
		arguments: ['type'],
		handler: function (player, args) {
			if (!args[1]) {
				player.chatBoxMessage('possible info types: position, stats');
			}
			else if (args[1] == 'position') {
				console.log(args, player.position);
				player.chatBoxMessage(...args, player.position.x, player.position.y);
			}
			else if (args[1] == 'stats') {
				var message = '';
				for (var i in player.baseStats)
					if (player[i])
						message += ` | ${i}: ${player[i].total}`;

				player.chatBoxMessage(message);
			}
		},
	},
	'goto': {
		description: 'teleport to unit',
		arguments: ['netId'],
		handler: function (player, args) {
			// teleport to unit by netId
			var netId = parseInt(args[1] || 0);
			var unit = UnitList.getUnitByNetId(netId);
			if (unit) {
				player.teleport(unit.position);
			}
			player.chatBoxMessage('teleporting player to ', unit.constructor.name, netId, '-', unit.position.x, unit.position.y);
		},
	},
	'pathfinding': {
		description: '',
		arguments: ['on/off'],
		handler: function (player, args) {
			if (!args[1]) {
				Server.doNotUsePathfinding = !Server.doNotUsePathfinding;
			}
			if (args[1] == '0' || args[1] == 'off') {
				Server.doNotUsePathfinding = true;
			}
			else if (args[1] == '1' || args[1] == 'on') {
				Server.doNotUsePathfinding = false;
			}
			else if (args[1] == '2') {
				Server.useTerrainEscape = !Server.useTerrainEscape;
				player.chatBoxMessage('Server.useTerrainEscape:', !!Server.useTerrainEscape);
			}
			player.chatBoxMessage('Server.doNotUsePathfinding:', !!Server.doNotUsePathfinding);
		},
	},
	'setCharacter': {
		description: '',
		arguments: ['characterName'],
		handler: function (player, args) {
			player.character = args[1] || 'Ezreal';
		},
	},
	'SystemMessage': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let packet = Server.network.createPacket('SystemMessage');
			packet.message = args.join(' ');
			player.sendPacket(packet);
		},
	},
	'gold': {
		description: 'set current player gold',
		arguments: ['amount'],
		handler: function (player, args) {
			player.gold = parseInt(args[1] || 10000);
			player.chatBoxMessage(...args);
		},
	},
	'mm': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let packet = Server.network.createPacket('UnitAddGold');
			//packet.netId = player.netId;
			packet.targetNetId = player.netId;
			packet.sourceNetId = player.netId;
			packet.goldAmount = 111;
			player.sendPacket(packet);
		},
	},
	'movespeed': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			player.moveSpeed.baseValue = parseInt(args[1] || 500);
		},
	},
	'wave': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			UnitList.barracks['BLUE'][1]?.spawnWave();
			UnitList.barracks['RED'][1]?.spawnWave();
		}
	},

};


module.exports = (player, packet) => {

	if (packet.msg[0] != '.')
		return;

	let command = packet.msg.slice(1);
	command = command || player.lastAdminCommand;
	player.lastAdminCommand = command;

	if (!command)
		return;

	let commandArgs = command.split(' ');

	if (commandList[commandArgs[0]]) {
		commandList[commandArgs[0]].handler(player, commandArgs);
	}
};
