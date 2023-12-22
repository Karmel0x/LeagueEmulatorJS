
import packets from '../../packets/index';
import Server from '../../app/Server';
import loadingStages from '../../constants/loadingStages';
import Team from '../extensions/traits/Team';
import { jungleCamps } from '../positions/index';
import Monster from '../units/Monster';
import Spawner from './Spawner';
import { JungleCampOptions } from '../GameObjects';


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
		const packet1 = new packets.CreateMinionCamp();
		packet1.position = this.position;
		packet1.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.LOADING);
	}

	notifyActivate() {
		const packet1 = new packets.ActivateMinionCamp();
		packet1.position = this.position;
		packet1.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.LOADING);
	}

	notifyDeactivate() {
		const packet1 = new packets.Neutral_Camp_Empty();
		packet1.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.LOADING);
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
