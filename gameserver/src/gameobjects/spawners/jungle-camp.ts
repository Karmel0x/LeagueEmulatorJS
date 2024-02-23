
import * as packets from '@workspace/packets/packages/packets';
import Server from '../../app/server';
import loadingStages from '../../constants/loading-stages';
import Team, { TeamId } from '../extensions/traits/team';
import { jungleCamps } from '../positions/index';
import Monster, { MonsterOptions } from '../units/monster';
import Spawner, { SpawnerOptions } from './spawner';


export type JungleCampOptions = SpawnerOptions & {
	monsters: MonsterOptions[];
};

/**
 * monster spawner
 */
export default class JungleCamp extends Spawner {

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

	static spawnAll(spawnList: object = jungleCamps) {
		for (let team in spawnList) {
			let teamSpawnList = spawnList[team];

			for (let num in teamSpawnList) {
				let spawn = teamSpawnList[num];

				new JungleCamp({
					team, num,
					netId: spawn.netId,
					character: spawn.character,
					spawnPosition: spawn.position || spawn.monsters[0].position,
					monsters: spawn.monsters,
				});
			}
		}
	}
}
