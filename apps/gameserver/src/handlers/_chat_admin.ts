
import { Vector2 } from '@repo/geometry';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import * as packetHelpers from '../../src/packet-helpers';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import { SlotId } from '../constants/slot-id';
import Logging, { LoggingOutput, LoggingType } from '../core/logging';
import Timer from '../core/timer';
import { IStat } from '../gameobjects/extensions/stats/istat';
import { TeamId } from '../gameobjects/extensions/traits/team';
import Minion from '../gameobjects/unit-ai/minion';
import Player from '../gameobjects/unit-ai/player';
import AttackableUnit from '../gameobjects/units/attackable-unit';
import { filterUnitsForCommand } from './_chat_admin_helper';


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
			player.packets.chatBoxDebugMessage(...args);

		}
	},
	'help': {
		description: 'shows available admin commands',
		arguments: [],
		handler: function (player, args) {

			const messages = [];
			for (const commandName in commandList) {
				const command = commandList[commandName as keyof typeof commandList]!;

				let commandLine = '.' + commandName;
				if (command.arguments && command.arguments.length)
					commandLine += ' ' + command.arguments.join(' ');
				if (command.description)
					commandLine += ' :: ' + command.description;

				messages.push(commandLine);
			}

			//messages.forEach((message, i) => {
			//	const packet1 = packets.HandleQuestUpdate.create({
			//		objective: `admin commands ${i + 1}`,
			//		tooltip: message.slice(0, 128),
			//		//reward: message.slice(128, 257),
			//		questType: Math.floor(i / 3),
			//		questId: i,
			//	});
			//
			//	player.network.sendPacket(packet1);
			//});

			player.packets.chatBoxDebugMessage(messages.join('\n'));
		}
	},
	'': {
		description: 'run last command',
		arguments: [],
		handler: function (player, args) { },
	},
	'pause': {
		description: 'pause game',
		arguments: [],
		handler: function (player, args) {
			if (Timer.app.pausedAt) {
				//const packet1 = packets.PausePacket.create({
				//	clientId: player.clientId,
				//	pauseTimeRemaining: 60 * 30,
				//	isTournament: false,
				//});
				//player.owner.packets.toEveryone(packet1);

				player.packets.chatBoxDebugMessage('unpausing timers');
				Timer.app.resume();
				Server.game.timer.resume();
			}
			else {
				//const packet1 = packets.ResumePacket.create({
				//	clientId: player.clientId,
				//	delayed: false,
				//});
				//player.owner.packets.toEveryone(packet1);

				player.packets.chatBoxDebugMessage('pausing timers');
				Timer.app.pause();
				Server.game.timer.pause();
			}
		},
	},
	'gameSpeed': {
		description: 'set game speed',
		arguments: ['speed'],
		handler: function (player, args) {
			let speed = Number(args[1] || '1');
			if (speed <= 0) {
				player.packets.chatBoxDebugMessage('speed must be greater than 0');
				return;
			}

			const packet1 = packets.SetFrequency.create({
				newFrequency: speed,
			});
			player.owner.packets.toEveryone(packet1);

			player.packets.chatBoxDebugMessage('speeding up timer', speed);
			Timer.app.speedUp(speed);
		},
	},
	'moveSpeed': {
		description: 'set move speed',
		arguments: ['moveSpeed', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let moveSpeed = parseInt(args[1] || '325');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.stats.moveSpeed.baseValue = moveSpeed;
				unit.stats.moveSpeed.flatBonus = 0;
				unit.stats.moveSpeed.percentBonus = 0;
				packetHelpers.sendUnitStats(unit);
			});
		},
	},
	'attackSpeed': {
		description: 'set attack speed',
		arguments: ['attackSpeed', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let attackSpeed = parseFloat(args[1] || '0.625');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.stats.attackSpeed.baseValue = attackSpeed;
				unit.stats.attackSpeed.flatBonus = 0;
				unit.stats.attackSpeed.percentBonus = 0;
				packetHelpers.sendUnitStats(unit);
			});
		},
	},
	'kill': {
		description: 'kill unit',
		arguments: ['all/me/unitType/netId'],
		handler: function (player, args) {
			let unitType = args[1];
			if (!unitType)
				return;

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.combat.die(player.owner);
			});
		},
	},
	'unkillable': {
		description: 'make unit unkillable',
		arguments: ['all/me/unitType/netId', 'unkillable(1/0)'],
		handler: function (player, args) {
			let unitType = args[1] || 'me';
			let unkillable = args[2] === '1' ? true : (args[2] === '0' ? false : undefined);

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.combat.unkillable = unkillable ?? !unit.combat.unkillable;
			});
		},
	},
	'start': {
		description: 'start game (start spawning minions)',
		arguments: [],
		handler: function (player, args) {
			Server.commandStartGame = true;
			player.packets.chatBoxDebugMessage('starting game');
		},
	},
	'packetInspector': {
		description: '',
		arguments: ['websocket/console/none'],
		handler: function (player, args) {
			Logging.changeOptions({
				packet: Logging.output[args[1] as keyof typeof Logging.output] || Logging.output.websocket,
			});
			player.packets.chatBoxDebugMessage(`packet logging: ${(Logging.options as { [key in LoggingType]?: LoggingOutput }).packet?.name}`);
		},
	},
	'levelup': {
		description: 'levelup current player',
		arguments: ['levelCount', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let amount = parseInt(args[1] || '1');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				for (let i = amount; i > 0; i--)
					unit.progress.levelUp();
			});
		},
	},
	'expup': {
		description: 'add experience for current player',
		arguments: ['expAmount', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let amount = parseInt(args[1] || '50');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.progress.expUp(amount);
			});
		},
	},
	'gold': {
		description: 'set player gold',
		arguments: ['amount', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let amount = parseInt(args[1] || '10000');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.progress.gold = amount;
			});
		},
	},
	'hp': {
		description: 'set current player health',
		arguments: ['amount/value%', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let amountArg = args[1] || '100%';
			let amountIsPercent = amountArg.endsWith('%');

			let amount = parseInt(amountArg.replace('%', ''));
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				if (amountIsPercent)
					unit.stats.health.current = unit.stats.health.total * amount / 100;
				else
					unit.stats.health.current = amount;

				unit.packets.OnEnterLocalVisibilityClient();
			});
		},
	},
	'mp': {
		description: 'set current player mana',
		arguments: ['amount/value%', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let amountArg = args[1] || '100%';
			let amountIsPercent = amountArg.endsWith('%');

			let amount = parseInt(amountArg.replace('%', ''));
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				if (amountIsPercent)
					unit.stats.mana.current = unit.stats.mana.total * amount / 100;
				else
					unit.stats.mana.current = amount;

				unit.packets.OnEnterLocalVisibilityClient();
			});
		},
	},
	'info': {
		description: 'print in chat some informations you may need',
		arguments: ['type'],
		handler: function (player, args) {
			const owner = player.owner;
			const type = args[1];

			if (!type) {
				player.packets.chatBoxDebugMessage('possible info types: position, stats, buffs');
				return;
			}

			if (type === 'position') {
				player.packets.chatBoxDebugMessage(...args, {
					x: Math.round(owner.position.x * 1e3) / 1e3,
					y: Math.round(owner.position.y * 1e3) / 1e3,
				});
				return;
			}

			if (type === 'stats') {
				let message = '';
				for (let i in owner.stats.base) {
					let playerStat = owner.stats[i as keyof typeof owner.stats] as IStat;
					if (playerStat)
						message += ` | ${i}: ${playerStat.total}`;
				}

				player.packets.chatBoxDebugMessage(message);
				return;
			}

			if (type === 'buffs') {
				let message = '';
				for (let i in owner.buffManager.buffs) {
					let buff = owner.buffManager.buffs[i as keyof typeof owner.buffManager.buffs]!;
					message += ` | ${buff.spell.name}: ${buff.stacks}`;
				}

				player.packets.chatBoxDebugMessage(message);
				return;
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

			const owner = player.owner;
			owner.moving.teleport(unit.position);
			player.packets.chatBoxDebugMessage('teleporting player to ', unit.constructor.name, netId, '-', unit.position.x, unit.position.y);
		},
	},
	'gopos': {
		description: 'teleport to position',
		arguments: ['x', 'y'],
		handler: function (player, args) {
			let x = parseInt(args[1] || '0');
			let y = parseInt(args[2] || '0');

			const owner = player.owner;
			owner.moving.teleport(new Vector2(x, y));
			player.packets.chatBoxDebugMessage('teleporting player to ', x, y);
		},
	},
	'pathfinding': {
		description: '',
		arguments: ['00-11 pathfinding terrainEscape'],
		handler: function (player, args) {
			if (!args[1]) {
				player.packets.chatBoxDebugMessage({
					pathFinding: Server.usePathFinding,
					terrainEscape: Server.useTerrainEscape,
				});
				return;
			}

			let bits = (args[1] || '').split('');
			Server.usePathFinding = bits[0] === '1';
			Server.useTerrainEscape = bits[1] === '1';
		},
	},
	'setCharacter': {
		description: '',
		arguments: ['characterName'],
		handler: function (player, args) {
			const owner = player.owner;
			owner.switchCharacter(args[1] || 'Ezreal');
		},
	},
	'wave': {
		description: '',
		arguments: ['team'],
		handler: function (player, args) {
			if (!args[1])
				args[1] = 'order,chaos';

			if (args[1].includes('order')) {
				GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order)?.spawnWave();
			}

			if (args[1].includes('chaos')) {
				GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos)?.spawnWave();
			}
		}
	},
	'test': {
		description: 'levelUp player 5 levels and spawn 22 RED minions in BLUE base',
		arguments: [],
		handler: function (player, args) {
			let count = parseInt(args[1] || '22');
			for (let i = count; i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				const unit = barrack!.spawnUnit(MinionType.melee);
				(unit.ai as Minion).moveLane = () => { };
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}

			const owner = player.owner;
			for (let i = 5; i > 0; i--)
				owner.progress.levelUp();
		},
	},
	'spawnMinion': {
		description: '',
		arguments: ['team'],
		handler: function (player, args) {
			const owner = player.owner;
			let team = (args[1] || owner.team.getEnemyTeamId());
			player.packets.chatBoxDebugMessage('spawnMinion', team);
			GameObjectList.barracks.find(barrack => barrack.team.id === team)?.spawnUnit(MinionType.melee, {
				spawnPosition: owner.position,
			});
		},
	},
	'q': {
		description: 'spawn BLUE and RED minions',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order)?.spawnUnit(MinionType.melee);
				GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos)?.spawnUnit(MinionType.melee);
				//await delay(2);
			}
		},
	},
	'qq': {
		description: 'spawn RED minion and teleport to BLUE base',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				const unit = barrack!.spawnUnit(MinionType.melee);
				(unit.ai as Minion).moveLane = () => { };
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'qqq': {
		description: '',
		arguments: ['count', 'type'],
		handler: function (player, args) {
			//let characters = [
			//	'Basic', 'MechCannon', 'Wizard', 'MechMelee', //'MechRange',
			//];
			let j = parseInt(args[2] || '0');
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				const unit = barrack!.spawnUnit(j % 4);
				(unit.ai as Minion).moveLane = () => { };
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'ww': {
		description: 'move all RED minions to x: 10200, y: 13200',
		arguments: [],
		handler: function (player, args) {
			let pos = new Vector2(10200, 13200);
			let redMinions = GameObjectList.aliveUnits.filter(unit => unit.ai instanceof Minion && unit.team.id === TeamId.chaos) as AttackableUnit[];
			for (let i = 0, l = redMinions.length; i < l; i++)
				redMinions[i]!.moving.setWaypoints([pos.clone()]);
		},
	},
	'www': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			let count = parseInt(args[1] || '5');
			for (let i = count; i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				const unit = barrack!.spawnUnit(MinionType.melee);
				(unit.ai as Minion).moveLane = () => { };
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}

			const owner = player.owner;
			for (let i = 5; i > 0; i--)
				owner.progress.levelUp();
		},
	},
	'e': {
		description: 'resend player stats to client',
		arguments: [],
		handler: function (player, args) {
			const owner = player.owner;
			const packet1 = packetHelpers.OnReplication([
				owner,
			]);
			player.network.sendPacket(packet1);
			//console.log(packet1);
		},
	},
	//'ee': {
	//	description: `read player stats from '/constants/TestStats.json'`,
	//	arguments: [],
	//	handler: function (player, args) {
	//		//if (args.length > 1) {
	//		//	let stats = JSON.parse(args.join(' '));
	//		//	player.stats[stats.name] = stats.value;
	//		//} else {
	//		//	delete require.cache[require.resolve('../constants/TestStats.json')];
	//		//	Object.assign(player.stats, require('../constants/TestStats.json'));
	//		//}
	//	},
	//},
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
	//		if (debugLevel === 0) {
	//			console.debug_mp = console.debug_mp || console.debug;
	//			console.debug = () => { };
	//		}
	//		else if (debugLevel === 1) {
	//			console.debug_mp = console.debug_mp || console.debug;
	//			console.debug = console.debug_mp || console.debug;
	//		}
	//	},
	//},
	//'champion': {
	//	description: 'switch player champion',
	//	arguments: ['championName'],
	//	handler: function (player, args) {
	//		//let character = args[1] || 'Ezreal';
	//		//const Champion_ = require('@repo/gamedata/data/characters/' + character);
	//		//player.character = new Champion_(player);
	//		//player.packets.ChangeCharacterData(character);
	//		//player.packets.chatBoxDebugMessage('switching champion to:', character);
	//	},
	//},
	'SystemMessage': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			const packet1 = packets.SystemMessage.create({
				message: args.join(' '),
			});

			player.network.sendPacket(packet1);
		},
	},
	'mm': {
		description: '',
		arguments: [],
		handler: function (player, args) {
			const owner = player.owner;
			const packet1 = packets.UnitAddGold.create({
				//netId: player.netId,
				targetNetId: owner.netId,
				sourceNetId: owner.netId,
				amount: 111,
			});
			player.network.sendPacket(packet1);
		},
	},
	'aa': {
		description: '',
		arguments: ['extraTimeS'],
		handler: function (player, args) {
			let extraTimeS = parseInt(args[1] || '127');

			const owner = player.owner;
			let target = GameObjectList.unitByNetId(player.lastSelectedNetId);
			if (!target)
				return;

			owner.combat.basicAttacks.attackAns(target, SlotId.a, extraTimeS);
		}
	},
};

const aliasList: { [s: string]: string; } = {
	'gs': 'gameSpeed',
	'ms': 'moveSpeed',
	'as': 'attackSpeed',
	'pi': 'packetInspector',
};

export default (player: Player, packet: packets.ChatModel) => {

	if (!packet.message || packet.message[0] !== '.')
		return;

	let command = packet.message.slice(1);
	command = command || player.lastChatCommand;
	player.lastChatCommand = command;

	if (!command)
		return;

	const commandArgs = command.split(' ');
	let commandName = commandArgs[0];
	if (!commandName)
		return;

	let commandObject = commandList[commandName];

	if (!commandObject) {
		commandName = aliasList[commandName];
		if (!commandName)
			return;

		commandObject = commandList[commandName];
	}

	if (commandObject) {
		commandObject.handler(player, commandArgs);
	}
};
