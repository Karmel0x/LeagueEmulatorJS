
import * as packets from '@repo/packets/list';
import * as packetHelpers from '../../src/packet-helpers';
import { Vector2 } from 'three';
import Server from '../app/server';
import { TeamId } from '../gameobjects/extensions/traits/team';

import Player from '../gameobjects/units/player';
import Minion from '../gameobjects/units/minion';
import Logging, { LoggingOutput, LoggingType } from '../core/logging';
import GameObjectList from '../app/game-object-list';
import { IStat } from '../gameobjects/extensions/stats/istat';


export type Command = {
	description: string,
	arguments: string[],
	handler: (player: Player, args: string[]) => void,
};

const commandList: { [s: string]: Command; } = {
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
				const packet1 = packets.HandleQuestUpdate.create({
					objective: `admin commands ${i + 1}`,
					tooltip: message.slice(0, 128),
					reward: message.slice(128, 257),
					questType: Math.floor(i / 3),
					questId: i,
				});

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
				GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.order)?.spawnUnit('Basic');
				GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.chaos)?.spawnUnit('Basic');
				//await Promise.delay(2);
			}
		},
	},
	'spawnMinion': {
		description: '',
		arguments: ['team'],
		handler: function (player, args) {
			let team = (args[1] || player.team.getEnemyTeamId());
			player.packets.chatBoxMessage('spawnMinion', team);
			GameObjectList.barracks.find(barrack => barrack.team.id == team)?.spawnUnit('Basic', { spawnPosition: player.position });
		},
	},
	'qq': {
		description: 'spawn RED minion and teleport to BLUE base',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.chaos);
				barrack?.spawnUnit('Basic').moving.teleport(new Vector2(1000 + (i * 150), 600));
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
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.chaos);
				barrack?.spawnUnit(characters[j]).moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'start': {
		description: 'start game (start spawning minions)',
		arguments: [],
		handler: function (player, args) {
			Server.commandStartGame = true;
			player.packets.chatBoxMessage('starting game');
		},
	},
	'ww': {
		description: 'move all RED minions to x: 10200, y: 13200',
		arguments: [],
		handler: function (player, args) {
			let pos = new Vector2(10200, 13200);
			let redMinions = GameObjectList.aliveUnits.filter(unit => unit instanceof Minion && unit.team.id == TeamId.chaos) as Minion[];
			for (let i = 0, l = redMinions.length; i < l; i++)
				redMinions[i].moving.move1(pos.clone());
		},
	},
	'e': {
		description: 'resend player stats to client',
		arguments: [],
		handler: function (player, args) {
			const packet1 = packetHelpers.OnReplication([
				player,
			]);
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
			Logging.changeOptions({
				packet: Logging.output[args[1] as keyof typeof Logging.output] || Logging.output.websocket,
			});
			player.packets.chatBoxMessage(`packet logging: ${(Logging.options as { [key in LoggingType]?: LoggingOutput }).packet?.name}`);
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
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.chaos);
				const unit = barrack?.spawnUnit('Basic');
				unit?.moving.teleport(new Vector2(1000 + (i * 150), 600));
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
			//const Champion_ = require('@repo/gamedata/characters/' + character);
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
					let playerStat = player.stats[i as keyof typeof player.stats] as IStat;
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
			let unit = GameObjectList.unitByNetId(netId);
			if (!unit)
				return;

			player.moving.teleport(unit.position);
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
			player.switchCharacter(args[1] || 'Ezreal');
		},
	},
	'SystemMessage': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let packet1 = packets.SystemMessage.create({
				message: args.join(' '),
			});

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
			let packet1 = packets.UnitAddGold.create({
				//netId: player.netId,
				targetNetId: player.netId,
				sourceNetId: player.netId,
				amount: 111,
			});
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
		arguments: ['team'],
		handler: function (player, args) {
			if (!args[1])
				args[1] = 'order,chaos';

			if (args[1].includes('order')) {
				GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.order)?.spawnWave();
			}

			if (args[1].includes('chaos')) {
				GameObjectList.barracks.find(barrack => barrack.team.id == TeamId.chaos)?.spawnWave();
			}
		}
	},

};

export default (player: Player, packet: packets.ChatModel) => {

	if (!packet.message || packet.message[0] != '.')
		return;

	let command = packet.message.slice(1);
	command = command || player.lastChatCommand;
	player.lastChatCommand = command;

	if (!command)
		return;

	let commandArgs = command.split(' ');
	let commandObject = commandList[commandArgs[0]];

	if (commandObject) {
		commandObject.handler(player, commandArgs);
	}
};
