
import { Vector2, type Vector2Like } from '@repo/geometry';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import * as packetHelpers from '../../src/packet-helpers';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import { SlotId } from '../constants/slot-id';
import Logging, { type LoggingOutput, type LoggingType } from '../core/logging';
import Timer from '../core/timer';
import { humanizePosition } from '../core/utils';
import config from '../game/game.config.json';
import MeasureGeneral from '../gameobjectextensions/measure/general';
import { IStat } from '../gameobjectextensions/stats/istat';
import { TeamId } from '../gameobjectextensions/traits/team';
import LaneMinion from '../gameobjects/unit-ai/lane-minion';
import type Player from '../gameobjects/unit-ai/player';
import type AttackableUnit from '../gameobjects/units/attackable-unit';
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
			if (speed <= 0)
				throw new Error('speed must be greater than 0');

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
	'attackDamage': {
		description: 'set attack damage',
		arguments: ['attackDamage', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let attackDamage = parseFloat(args[1] || '100');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.stats.attackDamage.baseValue = attackDamage;
				unit.stats.attackDamage.flatBonus = 0;
				unit.stats.attackDamage.percentBonus = 0;
				packetHelpers.sendUnitStats(unit);
			});
		},
	},
	'armor': {
		description: 'set armor',
		arguments: ['armor', 'all/me/unitType/netId'],
		handler: function (player, args) {
			let armor = parseFloat(args[1] || '100');
			let unitType = args[2] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.stats.armor.baseValue = armor;
				unit.stats.armor.flatBonus = 0;
				unit.stats.armor.percentBonus = 0;
				packetHelpers.sendUnitStats(unit);
			});
		},
	},
	'god': {
		description: 'set god stats',
		arguments: ['all/me/unitType/netId'],
		handler: function (player, args) {
			let unitType = args[1] || 'me';

			let units = filterUnitsForCommand(player, GameObjectList.aliveUnits, unitType);

			units.forEach(unit => {
				unit.stats.health.baseValue = 7500;
				unit.stats.health.current = 6000;
				unit.stats.moveSpeed.baseValue = 600;
				unit.stats.attackSpeed.baseValue = 2;
				unit.stats.attackDamage.baseValue = 600;
				unit.stats.armor.baseValue = 900;
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
				throw new Error('no unitType');

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
				if (unkillable === undefined)
					unkillable = !(unit.stats.health.minimum > 0);

				unit.stats.health.minimum = unkillable ? 1 : 0;
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
			const dest = args[1] as keyof typeof Logging.output || 'websocket';
			Logging.changeOptions({
				packet: Logging.output[dest],
			});
			player.packets.chatBoxDebugMessage(`packet logging: ${(Logging.options as { [key in LoggingType]?: LoggingOutput }).packet?.name}`);
		},
	},
	'levelup': {
		description: 'levelup unit',
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
		description: 'add experience for unit',
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
		description: 'set unit gold',
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
		description: 'set unit health',
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
		description: 'set unit mana',
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
				player.packets.chatBoxDebugMessage(...args, humanizePosition(owner.position));
				return;
			}

			if (type === 'base-stats') {
				let message = '';
				const stats = owner.stats;
				const base = owner.stats.base;
				for (let i in base) {
					let playerStat = stats[i as keyof typeof stats] as IStat;
					if (playerStat)
						message += ` | ${i}: ${playerStat.total}`;
				}

				player.packets.chatBoxDebugMessage(message);
				return;
			}

			if (type === 'stats') {
				let message = '';
				const stats = owner.stats;
				for (let i in stats) {
					let playerStat = stats[i as keyof typeof stats] as IStat;
					if (playerStat && playerStat instanceof IStat)
						message += ` | ${i}: ${playerStat.total}`;
				}

				player.packets.chatBoxDebugMessage(message);
				return;
			}

			if (type === 'buffs') {
				let message = '';
				const buffs = owner.buffManager.buffs;
				for (let i in buffs) {
					let buff = buffs[i as keyof typeof buffs]!;
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
				throw new Error('no unit');

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
			let firstArg = args[1];
			if (!firstArg) {
				player.packets.chatBoxDebugMessage({
					pathFinding: !config.debugging.noPathFinding,
					terrainEscape: !config.debugging.noTerrainEscape,
				});
				return;
			}

			let bits = firstArg.split('');
			config.debugging.noPathFinding = bits[0] === '0';
			config.debugging.noTerrainEscape = bits[1] === '0';
		},
	},
	'character': {
		description: '',
		arguments: ['name'],
		handler: function (player, args) {
			const owner = player.owner;
			owner.switchCharacter(args[1] || 'Ezreal');
		},
	},
	'wave': {
		description: '',
		arguments: ['team'],
		handler: function (player, args) {
			let teams = args[1];
			if (!teams)
				teams = 'order,chaos';

			if (teams.includes('order')) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order);
				barrack?.spawnWave();
			}

			if (teams.includes('chaos')) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				barrack?.spawnWave();
			}
		}
	},
	'no': {
		description: '',
		arguments: ['cd/mp'],
		handler: function (player, args) {
			let resources = args[1];
			if (!resources)
				resources = 'cd,mp';

			const stats = player.owner.stats;

			if (resources.includes('cd')) {
				if (stats.cooldownMod.minTotal === -1) {
					stats.cooldownMod.baseValue = 0;
					stats.cooldownMod.minTotal = -0.4;
				}
				else {
					stats.cooldownMod.baseValue = -1;
					stats.cooldownMod.minTotal = -1;
				}
			}

			if (resources.includes('mp')) {
				if (stats.manaCostReduction.minTotal === -1) {
					stats.manaCostReduction.baseValue = 0;
					stats.manaCostReduction.minTotal = -0.4;
				}
				else {
					stats.manaCostReduction.baseValue = -1;
					stats.manaCostReduction.minTotal = -1;
				}
			}
		}
	},
	'test': {
		description: 'levelUp player 5 levels and spawn 22 CHAOS minions in ORDER base',
		arguments: [],
		handler: function (player, args) {
			let count = parseInt(args[1] || '22');
			for (let i = count; i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				if (!barrack) continue;

				const unit = barrack.spawnUnit(MinionType.melee);
				(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
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
			const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === team);
			if (!barrack) return;

			const unit = barrack.spawnUnit(MinionType.melee, {
				spawnPosition: owner.position,
			});
			(unit.ai as LaneMinion).moveLane = () => { };
			unit.combat.autoAttackToggle = false;
		},
	},
	'spawnMinionAround': {
		description: '',
		arguments: ['team'],
		handler: function (player, args) {
			const owner = player.owner;
			let team = (args[1] || owner.team.getEnemyTeamId());
			player.packets.chatBoxDebugMessage('spawnMinion', team);
			const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === team);
			if (!barrack) return;

			const radius = owner.stats.acquisitionRange.total + 50;
			const pointsAround = MeasureGeneral.getPointsAround(owner, radius);

			pointsAround.forEach(point => {
				const unit = barrack.spawnUnit(MinionType.melee, {
					spawnPosition: point,
				});
				(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
			});
		},
	},
	'teleport': {
		description: '',
		arguments: ['top/mid/bot/order/chaos'],
		handler: function (player, args) {
			const owner = player.owner;
			const point = args[1] || 'mid';

			const points: Record<string, Vector2Like> = {
				'top': { x: 2400, y: 11700 },
				'mid': { x: 7000, y: 7000 },
				'bot': { x: 11700, y: 2400 },
				'order': { x: 200, y: 400 },
				'chaos': { x: 13800, y: 14000 },
			};

			const p = points[point];
			if (!p)
				throw new Error('teleport point does not exist');

			owner.moving.teleport(p);
		},
	},
	'q': {
		description: 'spawn ORDER and CHAOS minions',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			const l = parseInt(args[1] || '1');

			for (let i = 0; i < l; i++) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.order);
				if (!barrack) continue;

				const unit = barrack.spawnUnit(MinionType.melee);
				//(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
			}

			for (let i = 0; i < l; i++) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				if (!barrack) continue;

				const unit = barrack.spawnUnit(MinionType.melee);
				//(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
			}
		},
	},
	'qq': {
		description: 'spawn CHAOS minion and teleport to ORDER base',
		arguments: ['minionsAmount'],
		handler: function (player, args) {
			for (let i = parseInt(args[1] || '1'); i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				if (!barrack) continue;

				const unit = barrack.spawnUnit(MinionType.melee);
				(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
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
			let i = parseInt(args[1] || '1');
			let j = parseInt(args[2] || '0');
			for (; i > 0; i--) {
				const barrack = GameObjectList.barracks.find(barrack => barrack.team.id === TeamId.chaos);
				if (!barrack) continue;

				const unit = barrack.spawnUnit(j % 4);
				(unit.ai as LaneMinion).moveLane = () => { };
				unit.combat.autoAttackToggle = false;
				unit.moving.teleport(new Vector2(1000 + (i * 150), 600));
			}
		},
	},
	'ww': {
		description: 'move all CHAOS minions to x: 10200, y: 13200',
		arguments: [],
		handler: function (player, args) {
			let pos = new Vector2(10200, 13200);
			let redMinions = GameObjectList.aliveUnits.filter(unit => unit.ai instanceof LaneMinion && unit.team.id === TeamId.chaos) as AttackableUnit[];
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
				if (!barrack) continue;

				const unit = barrack.spawnUnit(MinionType.melee);
				(unit.ai as LaneMinion).moveLane = () => { };
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
				throw new Error('no target');

			owner.combat.basicAttacks.attackAns(target, SlotId.a, extraTimeS);
		}
	},
};

const aliasList: { [s: string]: string; } = {
	'gs': 'gameSpeed',
	'ms': 'moveSpeed',
	'as': 'attackSpeed',
	'pi': 'packetInspector',
	'sma': 'spawnMinionAround',
	'tp': 'teleport',
};

export default (player: Player, packet: packets.ChatModel) => {
	if (!config.testing.enabled || !config.testing.adminCommands)
		return;

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

	if (!commandObject) {
		player.packets.chatBoxDebugMessage('command does not exist');
		return;
	}

	try {
		commandObject.handler(player, commandArgs);
		//player.packets.chatBoxDebugMessage(commandArgs);
	}
	catch (e) {
		console.warn(e);
		if (e instanceof Error) {
			player.packets.chatBoxDebugMessage('error:', e.message);
		}
	}
};
