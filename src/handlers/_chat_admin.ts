
import packets from '../packets/index';
import { Vector2 } from 'three';
import UnitList from '../app/UnitList';
import Server from '../app/Server';
import Team from '../gameobjects/extensions/traits/Team';

import Player from '../gameobjects/units/Player';
import Minion from '../gameobjects/units/Minion';


export type commandObject = {
	description: string,
	arguments: string[],
	handler: (player: Player, args: string[]) => void,
};

const commandList: { [s: string]: commandObject; } = {
	'a': {
		description: 'test command',
		arguments: [],
		handler: function (player, args) {
			player.packets.chatBoxMessage(...args);

		}
	},
	'help': {
		description: 'shows available admin commands',
		arguments: [],
		handler: function (player, args) {

			let messages = [];
			for (let commandName in commandList) {
				let command = commandList[commandName as keyof typeof commandList];

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
				const packet1 = new packets.HandleQuestUpdate();
				packet1.objective = `admin commands ${i + 1}`;
				packet1.tooltip = message.slice(0, 128);
				packet1.reward = message.slice(128, 257);
				packet1.questType = Math.floor(i / 3);
				packet1.questId = i;
				player.network.sendPacket(packet1);
			});
		}
	},
	'': {
		description: 'run last command',
		arguments: [],
		handler: function (player, args) { },
	},
	'q': {
		description: 'spawn BLUE and RED minions',
		arguments: ['minionsAmount'],
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
		handler: function (player, args) {
			let team = (args[1] || player.team.getEnemyTeam());
			player.packets.chatBoxMessage('spawnMinion', team);
			UnitList.barracks[team][0].spawnUnit('Basic', { spawnPosition: player.position });
		},
	},
	'qq': {
		description: 'spawn RED minion and teleport to BLUE base',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				UnitList.barracks[Team.TEAM_RED][0].spawnUnit('Basic').moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'qqq': {
		description: '',
		arguments: [],
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
		handler: function (player, args) {
			Server.command_START_GAME = true;
			player.packets.chatBoxMessage('starting game');
		},
	},
	'ww': {
		description: 'move all RED minions to x: 10200, y: 13200',
		arguments: [],
		handler: function (player, args) {
			let pos = new Vector2(10200, 13200);
			let redMinionUnits = UnitList.getUnitsF(Team.TEAM_RED, 'Minion') as Minion[];
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
		handler: function (player, args) {
			const packet1 = new packets.OnReplication();
			//packet1.syncId = performance.now();
			//packet1.units = [UnitList.units[0]];
			packet1.units = [player];
			player.network.sendPacket(packet1);
			//console.log(packet1);
		},
	},
	'r': {
		description: `read player stats from '/constants/TestStats.json'`,
		arguments: [],
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
			player.packets.chatBoxMessage(`packet logging: ${Server.logging.options.packet.name}`);
		},
	},
	'levelup': {
		description: 'levelup current player',
		arguments: ['levelCount'],
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
		handler: function (player, args) {
			let expCount = parseInt(args[1] || '1');
			player.progress.expUp(expCount);
			player.packets.chatBoxMessage('expup:', expCount);
		},
	},
	'hp': {
		description: 'set current player health',
		arguments: ['hpPercent'],
		handler: function (player, args) {
			let hpPercent = parseInt(args[1] || '100');
			player.stats.health.current = player.stats.health.total * hpPercent / 100;
			player.packets.OnEnterLocalVisibilityClient();
		},
	},
	'test': {
		description: 'levelUp player 5 levels and spawn 22 RED minions in BLUE base',
		arguments: [],
		handler: function (player, args) {
			for (let i = 22; i > 0; i--) {
				let unit = UnitList.barracks[Team.TEAM_RED][0].spawnUnit('Basic');
				//unit.moveLane = () => {};
				//unit.once('initialized', () => {
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
				//});
			}

			for (let i = 5; i > 0; i--)
				player.progress.levelUp();
		},
	},
	'champion': {
		description: 'switch player champion',
		arguments: ['championName'],
		handler: function (player, args) {
			//let character = args[1] || 'Ezreal';
			//const Champion_ = require('../game/leaguedata/characters/' + character);
			//player.character = new Champion_(player);
			//player.packets.ChangeCharacterData(character);
			//player.packets.chatBoxMessage('switching champion to:', character);
		},
	},
	'info': {
		description: 'print in chat some informations you may need',
		arguments: ['type'],
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
		handler: function (player, args) {
			player.character = args[1] || 'Ezreal';
		},
	},
	'SystemMessage': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let packet1 = new packets.SystemMessage();
			packet1.message = args.join(' ');
			player.network.sendPacket(packet1);
		},
	},
	'gold': {
		description: 'set current player gold',
		arguments: ['amount'],
		handler: function (player, args) {
			player.progress.gold = parseInt(args[1] || '10000');
			player.packets.chatBoxMessage(...args);
		},
	},
	'mm': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let packet1 = new packets.UnitAddGold();
			//packet1.netId = player.netId;
			packet1.targetNetId = player.netId;
			packet1.sourceNetId = player.netId;
			packet1.goldAmount = 111;
			player.network.sendPacket(packet1);
		},
	},
	'movespeed': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			player.stats.moveSpeed.baseValue = parseInt(args[1] || '500');
		},
	},
	'wave': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			UnitList.barracks[Team.TEAM_BLUE][1]?.spawnWave();
			UnitList.barracks[Team.TEAM_RED][1]?.spawnWave();
		}
	},

};


/**
 * 
 * @param {Player} player 
 * @param {typeof import('../packets/COMMUNICATION/0x68-Chat.js').struct} packet 
 */
export default (player, packet) => {

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
