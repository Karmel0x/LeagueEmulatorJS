import { defaultHeight } from '@repo/geometry/vector2-with-z';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import loadingStages from '../../constants/game-state';
import { EventEmitter2 } from '../../core/event-emitter2';
import { accurateDelay } from '../../core/timer';
import { TeamId } from '../../gameobjectextensions/traits/team';
import NeutralMinion from '../unit-ai/neutral-minion';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import Spawner, { type SpawnerEvents, type SpawnerOptions } from './spawner';

//enum CampLevel {
//	none = 0x0,
//	normal = 0x1,
//	epic = 0x2,
//	healthPack = 0x3,
//	speedShrine = 0x4,
//}

export type JungleCampOptions = SpawnerOptions & {
	num: number;
	side: TeamId;
	monsters: Omit<AttackableUnitOptions, 'spawner'>[];
	respawnTime: number;
	delaySpawnTime: number;
};

export type JungleCampEvents = SpawnerEvents & {
	'clearCamp': () => void;
};

/**
 * monster spawner
 */
export default class JungleCamp extends Spawner {
	static initialize(options: JungleCampOptions) {
		return super.initialize(options) as JungleCamp;
	}

	//static spawnAll(spawnList = Server.map.positions.jungleCamps) {
	//	for (let i = 0; i < spawnList.length; i++) {
	//		let spawn = spawnList[i]!;
	//
	//		JungleCamp.initialize({
	//			team: TeamId.neutral,
	//			side: spawn.team,
	//			num: spawn.num,
	//			netId: spawn.netId,
	//			spawnPosition: spawn.position || spawn.monsters[0]?.position,
	//			monsters: spawn.monsters,
	//		});
	//	}
	//}

	static async runSpawners(list: JungleCamp[]) {
		list.forEach(async (spawner) => {
			// @todo uncomment this
			//const startAt = spawner.options.delaySpawnTime * 1000;
			//while (startAt > Server.game.timer.now())
			//	await delay(100);

			spawner.notifyCreate();
			spawner.spawnMonsters();

			spawner.eventEmitter.on('clearCamp', async () => {
				spawner.notifyDeactivate();

				await accurateDelay(spawner.options.respawnTime * 1000);
				spawner.spawnMonsters();
			});
		});
	}

	static spawnAll() {
		const { jungleCamps } = Server.map.positions;
		const list: JungleCamp[] = [];

		for (let i = 0; i < jungleCamps.length; i++) {
			const spawn = jungleCamps[i]!;

			const side = spawn.side;
			const num = Number(i);

			const monsters = spawn.monsters;
			const spawnPosition = monsters[0]!.spawnPosition!;
			const height = monsters[0]!.height ?? defaultHeight;

			const jungleCamp = JungleCamp.initialize({
				team: TeamId.neutral,
				side,
				num,
				spawnPosition: { x: spawnPosition.x, y: spawnPosition.y },
				height,
				monsters,
				respawnTime: spawn.respawnTime,
				delaySpawnTime: spawn.delaySpawnTime,
			});
			jungleCamp.spawn();
			list.push(jungleCamp);
		}

		this.runSpawners(list);
	}

	static callUnitToSpawnPosition(unit: AttackableUnit) {
		unit.combat.attackTarget = undefined;
		unit.moving.setWaypoints([unit.spawnPosition]);
	}

	readonly eventEmitter = new EventEmitter2<JungleCampEvents>();
	declare options: JungleCampOptions;
	num: number;
	side: number;

	isHardResettingInProgress = false;

	constructor(options: JungleCampOptions) {
		super(options);

		this.num = options.num;
		this.side = options.side;
	}

	hardReset(units: AttackableUnit[]) {
		if (this.isHardResettingInProgress)
			return;

		this.isHardResettingInProgress = true;
		units.forEach((unit) => {
			JungleCamp.callUnitToSpawnPosition(unit);
		});

		const interval1 = setInterval(() => {
			const aliveCampUnits = units.filter((unit) => {
				if (unit.combat.died)
					return false;

				return true;
			});

			aliveCampUnits.forEach((unit) => {
				unit.combat.healPercent(unit, 10);
			});

			const isUnitInSpawn = aliveCampUnits.some((unit) => {
				if (unit.spawnPosition.distanceTo(unit.position) <= 150)
					return true;

				return false;
			});

			if (isUnitInSpawn) {
				aliveCampUnits.forEach((unit) => {
					unit.combat.healPercent(unit, 60);
				});

				clearInterval(interval1);
				this.isHardResettingInProgress = false;
			}
		}, 250);
	}

	softReset(units: AttackableUnit[]) {
		units.forEach((unit) => {
			JungleCamp.callUnitToSpawnPosition(unit);
		});
	}

	spawnMonsters() {
		const options = this.options;
		let killedMonstersCount = 0;
		const units: AttackableUnit[] = [];

		options.monsters.forEach((v, i) => {
			const unit = NeutralMinion.initializeUnit({
				team: options.team,
				spawnPosition: v.spawnPosition,
				facePosition: v.facePosition,
				height: v.height,
				name: v.name,
				character: v.character,
				spawner: this,
			});

			unit.spawn();
			units.push(unit);
		});

		units.forEach((unit) => {
			unit.combat.autoAttackToggle = false;

			unit.eventEmitter.once('death', () => {
				killedMonstersCount++;
				if (killedMonstersCount === options.monsters.length) {
					killedMonstersCount = 0;
					this.eventEmitter.emit('clearCamp');
				}
			});

			unit.eventEmitter.on('takeDamage', (source) => {
				if (this.isHardResettingInProgress)
					return;

				units.forEach((unit) => {
					if (unit.combat.attackTarget)
						return;

					unit.issueOrder(IssueOrderType.attackTo);

					unit.combat.startAttackAndFollow(source, {
						targetNetId: source.netId,
						position: source.position,
					});
				});
			});
		});

		let softResetsDetected = 0;
		const interval1 = setInterval(() => {
			const aliveCampUnits = units.filter((unit) => {
				if (unit.combat.died)
					return false;

				return true;
			});

			// TODO: if distance > 750 then find new target
			const isUnitInCampRange = aliveCampUnits.some((unit) => {
				if (this.spawnPosition.distanceTo(unit.position) <= 850)
					return true;

				return false;
			});

			if (!isUnitInCampRange) {
				if (softResetsDetected > 3) {
					this.hardReset(aliveCampUnits);
					softResetsDetected = 0;

				}
				else {
					this.softReset(aliveCampUnits);
					softResetsDetected++;
				}
			}
		}, 250);

		this.eventEmitter.once('clearCamp', () => {
			clearInterval(interval1);
		});

		this.notifyActivate();
	}

	notifyCreate() {
		const packet1 = packets.CreateMinionCamp.create({
			position: {
				x: this.position.x,
				y: this.position.y,
				z: this.height,
			},
			campIndex: this.num,
		});

		Server.teams[TeamId.all]?.sendPacket(packet1, loadingStages.loading);
	}

	notifyActivate() {
		const packet1 = packets.ActivateMinionCamp.create({
			position: {
				x: this.position.x,
				y: this.position.y,
				z: this.height,
			},
			campIndex: this.num,
		});

		Server.teams[TeamId.all]?.sendPacket(packet1, loadingStages.loading);
	}

	notifyDeactivate() {
		const packet1 = packets.Neutral_Camp_Empty.create({
			campIndex: this.num,
		});

		Server.teams[TeamId.all]?.sendPacket(packet1, loadingStages.loading);
	}
}
