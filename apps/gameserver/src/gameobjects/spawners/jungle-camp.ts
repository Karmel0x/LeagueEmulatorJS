
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import loadingStages from '../../constants/game-state';
import { EventEmitter2 } from '../../core/event-emitter2';
import { accurateDelay } from '../../core/timer';
import { TeamId } from '../extensions/traits/team';
import { jungleCamps } from '../positions';
import Monster from '../unit-ai/monster';
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

	readonly eventEmitter = new EventEmitter2<JungleCampEvents>();
	declare options: JungleCampOptions;
	num: number;
	side: number;

	constructor(options: JungleCampOptions) {
		super(options);

		this.num = options.num;
		this.side = options.side;
	}

	spawnMonsters() {
		const options = this.options;
		let killedMonstersCount = 0;

		options.monsters.forEach((v, i) => {
			const unit = Monster.initializeUnit({
				team: options.team,
				position: v.position,
				facePosition: v.facePosition,
				height: v.height,
				name: v.name,
				character: v.character,
				spawner: this,
			});

			unit.spawn();

			unit.eventEmitter.once('death', () => {
				killedMonstersCount++;
				if (killedMonstersCount === options.monsters.length) {
					killedMonstersCount = 0;
					this.eventEmitter.emit('clearCamp');
				}
			});
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

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.loading);
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

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.loading);
	}

	notifyDeactivate() {
		const packet1 = packets.Neutral_Camp_Empty.create({
			campIndex: this.num,
		});

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.loading);
	}

	//static spawnAll(spawnList = jungleCamps) {
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
		const list: JungleCamp[] = [];

		for (let i = 0; i < jungleCamps.length; i++) {
			const spawn = jungleCamps[i]!;

			const side = spawn.side;
			const num = Number(i);

			const monsters = spawn.monsters;
			const spawnPosition = monsters[0]!.position!;

			const jungleCamp = JungleCamp.initialize({
				team: TeamId.neutral,
				side,
				num,
				spawnPosition: { x: spawnPosition.x, y: spawnPosition.y },
				height: 50,
				monsters,
				respawnTime: spawn.respawnTime,
				delaySpawnTime: spawn.delaySpawnTime,
			});
			jungleCamp.spawn();
			list.push(jungleCamp);
		}

		this.runSpawners(list);
	}
}
