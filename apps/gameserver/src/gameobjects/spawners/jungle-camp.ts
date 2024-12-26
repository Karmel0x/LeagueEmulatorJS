
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import loadingStages from '../../constants/loading-stages';
import { TeamId } from '../extensions/traits/team';
import { jungleCamps } from '../positions/index';
import Monster, { MonsterOptions } from '../units/monster';
import Spawner, { SpawnerOptions } from './spawner';


//enum CampLevel {
//	none = 0x0,
//	normal = 0x1,
//	epic = 0x2,
//	healthPack = 0x3,
//	speedShrine = 0x4,
//}

export type JungleCampOptions = SpawnerOptions & {
	monsters: Omit<MonsterOptions, 'spawner'>[];
};

/**
 * monster spawner
 */
export default class JungleCamp extends Spawner {
	static initialize(options: JungleCampOptions) {
		return super.initialize(options) as JungleCamp;
	}

	constructor(options: JungleCampOptions) {
		super(options);

		options.monsters.forEach((v, i) => {
			Monster.initialize({
				team: options.team,
				num: i,
				spawnPosition: v.position,
				info: v.info,
				character: v.character,
				spawner: this,
			});
		});

		this.notifyCreate();
		this.notifyActivate();
	}

	notifyCreate() {
		const packet1 = packets.CreateMinionCamp.create({
			position: this.position,
			campIndex: this.team.num,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.loading);
	}

	notifyActivate() {
		const packet1 = packets.ActivateMinionCamp.create({
			position: this.position,
			campIndex: this.team.num,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.loading);
	}

	notifyDeactivate() {
		const packet1 = packets.Neutral_Camp_Empty.create({
			campIndex: this.team.num,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.loading);
	}

	static spawnAll(spawnList = jungleCamps) {
		for (let team in spawnList) {
			let teamSpawnList = spawnList[team as any as keyof typeof spawnList];

			for (let num in teamSpawnList) {
				let spawn = teamSpawnList[num as any as keyof typeof teamSpawnList];

				JungleCamp.initialize({
					team: Number(team),
					num: Number(num),
					netId: spawn.netId,
					spawnPosition: spawn.position || spawn.monsters[0].position,
					monsters: spawn.monsters,
				});
			}
		}
	}
}
