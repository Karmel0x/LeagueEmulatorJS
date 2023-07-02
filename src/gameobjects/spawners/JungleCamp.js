
const Server = require("../../app/Server");
const loadingStages = require("../../constants/loadingStages");
const Team = require("../extensions/traits/Team");
const { jungleCamps } = require("../positions");
const Monster = require("../units/Monster");
const Spawner = require("./Spawner");


/**
 * monster spawner
 */
module.exports = class JungleCamp extends Spawner {

	/**
	 * 
	 * @param {import('../GameObjects').JungleCampOptions} options 
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
		const CreateMinionCamp = Server.network.createPacket('CreateMinionCamp');
		CreateMinionCamp.position = this.position;
		CreateMinionCamp.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(CreateMinionCamp, loadingStages.LOADING);
	}

	notifyActivate() {
		const ActivateMinionCamp = Server.network.createPacket('ActivateMinionCamp');
		ActivateMinionCamp.position = this.position;
		ActivateMinionCamp.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(ActivateMinionCamp, loadingStages.LOADING);
	}

	notifyDeactivate() {
		const Neutral_Camp_Empty = Server.network.createPacket('Neutral_Camp_Empty');
		Neutral_Camp_Empty.campIndex = this.team.num;
		Server.teams[Team.TEAM_MAX].sendPacket(Neutral_Camp_Empty, loadingStages.LOADING);
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
};
