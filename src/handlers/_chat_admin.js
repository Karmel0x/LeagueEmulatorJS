
const { Vector2 } = require('three');
const UnitList = require('../app/UnitList');
const Server = require('../app/Server');
const Team = require('../gameobjects/extensions/traits/Team');


/**
 * @typedef {import('../gameobjects/units/Player')} Player
 */

const commandList = {
	'a': {
		description: 'test command',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			player.packets.chatBoxMessage(...args);

		}
	},
	'help': {
		description: 'shows available admin commands',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {

			let messages = [];
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
				const HandleQuestUpdate = Server.network.createPacket('HandleQuestUpdate');
				HandleQuestUpdate.objective = `admin commands ${i + 1}`;
				HandleQuestUpdate.tooltip = message.slice(0, 128);
				HandleQuestUpdate.reward = message.slice(128, 257);
				HandleQuestUpdate.questType = Math.floor(i / 3);
				HandleQuestUpdate.questId = i;
				player.network.sendPacket(HandleQuestUpdate);
			});
		}
	},
	'': {
		description: 'run last command',
	},
	'q': {
		description: 'spawn BLUE and RED minions',
		arguments: ['minionsAmount'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				UnitList.barracks[Team.TEAM_BLUE][0].spawnUnit('Basic');
				UnitList.barracks[Team.TEAM_RED][0].spawnUnit('Basic');
				//await Promise.wait(2);
			}
		},
	},
	'spawnMinion': {
		description: '',
		arguments: ['team'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let team = (args[1] || player.team.getEnemyTeam());
			player.packets.chatBoxMessage('spawnMinion', team);
			UnitList.barracks[team][0].spawnUnit('Basic', { spawnPosition: player.position });
		},
	},
	'qq': {
		description: 'spawn RED minion and teleport to BLUE base',
		arguments: ['minionsAmount'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				UnitList.barracks[Team.TEAM_RED][0].spawnUnit('Basic').moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'qqq': {
		description: '',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let characters = [
				'Basic', 'MechCannon', 'Wizard', 'MechMelee', //'MechRange',
			];
			let j = parseInt(args[2] || '0');
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				UnitList.barracks[Team.TEAM_RED][0].spawnUnit(characters[j]).moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'start': {
		description: 'start game (start spawning minions)',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			Server.command_START_GAME = true;
			player.packets.chatBoxMessage('starting game');
		},
	},
	'ww': {
		description: 'move all RED minions to x: 10200, y: 13200',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let pos = new Vector2(10200, 13200);
			let redMinionUnits = /** @type {import('../gameobjects/units/Minion')[]} */ (UnitList.getUnitsF(Team.TEAM_RED, 'Minion'));
			for (let i = 0, l = redMinionUnits.length; i < l; i++)
				redMinionUnits[i].moving.move1(pos.clone());
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
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			const OnReplication = Server.network.createPacket('OnReplication', 'LOW_PRIORITY');
			//OnReplication.syncId = performance.now();
			//OnReplication.units = [UnitList.units[0]];
			OnReplication.units = [player];
			player.network.sendPacket(OnReplication);
			//console.log(OnReplication);
		},
	},
	'r': {
		description: `read player stats from '/constants/TestStats.json'`,
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			//if (args.length > 1) {
			//	let stats = JSON.parse(args.join(' '));
			//	player.stats[stats.name] = stats.value;
			//} else {
			//	delete require.cache[require.resolve('../constants/TestStats.json')];
			//	Object.assign(player.stats, require('../constants/TestStats.json'));
			//}
		},
	},
	//'debugMode': {
	//	description: '',
	//	arguments: [],
	//	/**
	//	 * @param {Player} player 
	//	 * @param {string[]} args 
	//	 */
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
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			Server.logging.changeOptions({
				packet: Server.logging.output[args[1]] || Server.logging.output.websocket,
			});
			player.packets.chatBoxMessage(`packet logging: ${Server.logging.options.packet.name}`);
		},
	},
	'levelup': {
		description: 'levelup current player',
		arguments: ['levelCount'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let levelCount = parseInt(args[1] || '1');
			for (let i = levelCount; i > 0; i--)
				player.progress.levelUp();

			player.packets.chatBoxMessage('levelup:', levelCount);
		},
	},
	'expup': {
		description: 'add experience for current player',
		arguments: ['expAmount'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let expCount = parseInt(args[1] || '1');
			player.progress.expUp(expCount);
			player.packets.chatBoxMessage('expup:', expCount);
		},
	},
	'hp': {
		description: 'set current player health',
		arguments: ['hpPercent'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let hpPercent = parseInt(args[1] || '100');
			player.stats.health.current = player.stats.health.total * hpPercent / 100;
			player.packets.OnEnterLocalVisibilityClient();
		},
	},
	'test': {
		description: 'levelUp player 5 levels and spawn 22 RED minions in BLUE base',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			for (let i = 22; i > 0; i--) {
				let unit = UnitList.barracks[Team.TEAM_RED][0].spawnUnit('Basic');
				//unit.moveLane = () => {};
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}

			for (let i = 5; i > 0; i--)
				player.progress.levelUp();
		},
	},
	'champion': {
		description: 'switch player champion',
		arguments: ['championName'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let character = args[1] || 'Ezreal';
			const Champion_ = require('../game/leaguedata/characters/' + character);
			player.character = new Champion_(player);
			player.packets.ChangeCharacterData(character);
			player.packets.chatBoxMessage('switching champion to:', character);
		},
	},
	'info': {
		description: 'print in chat some informations you may need',
		arguments: ['type'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			if (!args[1]) {
				player.packets.chatBoxMessage('possible info types: position, stats');
			}
			else if (args[1] == 'position') {
				console.log(args, player.position);
				player.packets.chatBoxMessage(...args, player.position.x, player.position.y);
			}
			else if (args[1] == 'stats') {
				let message = '';
				for (let i in player.stats.base) {
					let playerStat = player.stats[i];
					if (playerStat)
						message += ` | ${i}: ${playerStat.total}`;
				}

				player.packets.chatBoxMessage(message);
			}
		},
	},
	'goto': {
		description: 'teleport to unit',
		arguments: ['netId'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			// teleport to unit by netId
			let netId = parseInt(args[1] || '0');
			let unit = UnitList.getUnitByNetId(netId);
			if (unit) {
				player.moving.teleport(unit.position);
			}
			player.packets.chatBoxMessage('teleporting player to ', unit.constructor.name, netId, '-', unit.position.x, unit.position.y);
		},
	},
	'pathfinding': {
		description: '',
		arguments: ['on/off'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
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
				player.packets.chatBoxMessage('Server.useTerrainEscape:', !!Server.useTerrainEscape);
			}
			player.packets.chatBoxMessage('Server.doNotUsePathfinding:', !!Server.doNotUsePathfinding);
		},
	},
	'setCharacter': {
		description: '',
		arguments: ['characterName'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			player.character = args[1] || 'Ezreal';
		},
	},
	'SystemMessage': {
		description: '',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let packet = Server.network.createPacket('SystemMessage');
			packet.message = args.join(' ');
			player.network.sendPacket(packet);
		},
	},
	'gold': {
		description: 'set current player gold',
		arguments: ['amount'],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			player.progress.gold = parseInt(args[1] || '10000');
			player.packets.chatBoxMessage(...args);
		},
	},
	'mm': {
		description: '',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			let packet = Server.network.createPacket('UnitAddGold');
			//packet.netId = player.netId;
			packet.targetNetId = player.netId;
			packet.sourceNetId = player.netId;
			packet.goldAmount = 111;
			player.network.sendPacket(packet);
		},
	},
	'movespeed': {
		description: '',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			player.stats.moveSpeed.baseValue = parseInt(args[1] || '500');
		},
	},
	'wave': {
		description: '',
		arguments: [],
		/**
		 * @param {Player} player 
		 * @param {string[]} args 
		 */
		handler: function (player, args) {
			UnitList.barracks[Team.TEAM_BLUE][1]?.spawnWave();
			UnitList.barracks[Team.TEAM_RED][1]?.spawnWave();
		}
	},

};


/**
 * 
 * @param {Player} player 
 * @param {*} packet 
 * @returns 
 */
module.exports = (player, packet) => {

	if (packet.msg[0] != '.')
		return;

	let command = packet.msg.slice(1);
	command = command || player.lastAdminCommand;
	player.lastAdminCommand = command;

	if (!command)
		return;

	let commandArgs = command.split(' ');
	let commandObject = commandList[commandArgs[0]];

	if (commandObject) {
		commandObject.handler(player, commandArgs);
	}
};
