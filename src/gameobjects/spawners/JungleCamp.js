
import packets from '../../packets/index.js';
import Server from '../../app/Server.js';
import loadingStages from '../../constants/loadingStages.js';
import Team from '../extensions/traits/Team.js';
import { jungleCamps } from '../positions/index.js';
import Monster from '../units/Monster.js';
import Spawner from './Spawner.js';


/**
 * monster spawner
 */
export default class JungleCamp extends Spawner {

	/**
	 * 
	 * @param {import('../GameObjects.js').JungleCampOptions} options 
	 */
	constructor(options) {
		super(options);

		options.monsters.forEach((v, i) => {
			new Monster({
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

	/**
	 * 
	 * @param {Object} spawnList
	 */
	static spawnAll(spawnList = jungleCamps) {
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
