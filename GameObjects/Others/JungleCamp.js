
const loadingStages = require("../../Constants/loadingStages");
const ExtendWTraits = require("../../Core/ExtendWTraits");
const GameObject = require("../GameObject");
const Monster = require("../Units/Monster");


// @todo correct positions, rotations
const JungleCamps = {
	NEUTRAL: {
		1: {
			type: 'Camp', name: 'blue_blue', monsters: [
				{ position: { x: 3632.7002, y: 7600.373 }, info: { name: 'AncientGolem1.1.1' }, character: 'AncientGolem' },
				{ position: { x: 3552.7002, y: 7799.373 }, info: { name: 'YoungLizard1.1.2' }, character: 'YoungLizard' },
				{ position: { x: 3452.7002, y: 7590.373 }, info: { name: 'YoungLizard1.1.3' }, character: 'YoungLizard' },
			]
		},
		2: {
			type: 'LesserCamp', name: 'blue_wolf', monsters: [
				{ position: { x: 3373.6782, y: 6223.3457 }, info: { name: 'GiantWolf2.1.1' }, character: 'GiantWolf' },
				{ position: { x: 3523.6782, y: 6223.3457 }, info: { name: 'Wolf2.1.2' }, character: 'Wolf' },
				{ position: { x: 3323.6782, y: 6373.3457 }, info: { name: 'Wolf2.1.3' }, character: 'Wolf' },
			]
		},
		3: {
			type: 'LesserCamp', name: 'blue_wraith', monsters: [
				{ position: { x: 6423, y: 5278.29 }, info: { name: 'Wraith3.1.1' }, character: 'Wraith' },
				{ position: { x: 6523, y: 5426.95 }, info: { name: 'LesserWraith3.1.2' }, character: 'LesserWraith' },
				{ position: { x: 6653.83, y: 5278.29 }, info: { name: 'LesserWraith3.1.3' }, character: 'LesserWraith' },
				{ position: { x: 6582.915, y: 5107.8857 }, info: { name: 'LesserWraith3.1.4' }, character: 'LesserWraith' },
			]
		},
		4: {
			type: 'Camp', name: 'blue_red', monsters: [
				{ position: { x: 7455.615, y: 3890.2026 }, info: { name: 'LizardElder4.1.1' }, character: 'LizardElder' },
				{ position: { x: 7460.615, y: 3710.2026 }, info: { name: 'YoungLizard4.1.2' }, character: 'YoungLizard' },
				{ position: { x: 7237.615, y: 3890.2026 }, info: { name: 'YoungLizard4.1.3' }, character: 'YoungLizard' },
			]
		},
		5: {
			type: 'LesserCamp', name: 'blue_golem', monsters: [
				{ position: { x: 7916.8423, y: 2533.9634 }, info: { name: 'SmallGolem5.1.1' }, character: 'SmallGolem' },
				{ position: { x: 8216.842, y: 2533.9634 }, info: { name: 'Golem5.1.2' }, character: 'Golem' },
			]
		},

		6: {
			type: 'Dragon', name: 'dragon', monsters: [
				{ position: { x: 9459.52, y: 4193.03 }, info: { name: 'Dragon6.1.1' }, character: 'Dragon' },
			]
		},

		7: {
			type: 'Camp', name: 'red_blue', monsters: [
				{ position: { x: 10386.605, y: 6811.1123 }, info: { name: 'AncientGolem7.1.1' }, character: 'AncientGolem' },
				{ position: { x: 10586.605, y: 6831.1123 }, info: { name: 'YoungLizard7.1.2' }, character: 'YoungLizard' },
				{ position: { x: 10526.605, y: 6601.1123 }, info: { name: 'YoungLizard7.1.3' }, character: 'YoungLizard' },
			]
		},
		8: {
			type: 'LesserCamp', name: 'red_wolf', monsters: [
				{ position: { x: 10651.523, y: 8116.4243 }, info: { name: 'GiantWolf8.1.1' }, character: 'GiantWolf' },
				{ position: { x: 10651.523, y: 7916.4243 }, info: { name: 'Wolf8.1.2' }, character: 'Wolf' },
				{ position: { x: 10451.523, y: 8116.4243 }, info: { name: 'Wolf8.1.3' }, character: 'Wolf' },
			]
		},
		9: {
			type: 'LesserCamp', name: 'red_wraith', monsters: [
				{ position: { x: 7580.368, y: 9250.405 }, info: { name: 'Wraith9.1.1' }, character: 'Wraith' },
				{ position: { x: 7480.368, y: 9091.405 }, info: { name: 'LesserWraith9.1.2' }, character: 'LesserWraith' },
				{ position: { x: 7350.368, y: 9230.405 }, info: { name: 'LesserWraith9.1.3' }, character: 'LesserWraith' },
				{ position: { x: 7450.368, y: 9350.405 }, info: { name: 'LesserWraith9.1.4' }, character: 'LesserWraith' },
			]
		},
		10: {
			type: 'Camp', name: 'red_red', monsters: [
				{ position: { x: 6504.2407, y: 10584.5625 }, info: { name: 'LizardElder10.1.1' }, character: 'LizardElder' },
				{ position: { x: 6704.2407, y: 10584.5625 }, info: { name: 'YoungLizard10.1.2' }, character: 'YoungLizard' },
				{ position: { x: 6504.2407, y: 10784.5625 }, info: { name: 'YoungLizard10.1.3' }, character: 'YoungLizard' },
			]
		},
		11: {
			type: 'LesserCamp', name: 'red_golem', monsters: [
				{ position: { x: 5810.464, y: 11925.474 }, info: { name: 'SmallGolem11.1.1' }, character: 'SmallGolem' },
				{ position: { x: 6140.464, y: 11935.474 }, info: { name: 'Golem11.1.2' }, character: 'Golem' },
			]
		},

		12: {
			type: 'Baron', name: 'baron', monsters: [
				{ position: { x: 4600.495, y: 10250.462 }, info: { name: 'Worm12.1.1' }, character: 'Worm' },
			]
		},

		13: {
			type: 'LesserCamp', name: 'blue_greatWraith', monsters: [
				{ position: { x: 1684, y: 8207 }, info: { name: 'GreatWraith14.1.1' }, character: 'GreatWraith' },
			]
		},
		14: {
			type: 'LesserCamp', name: 'red_greatWraith', monsters: [
				{ position: { x: 12337, y: 6263 }, info: { name: 'GreatWraith14.1.1' }, character: 'GreatWraith' },
			]
		},
	}
};


module.exports = class JungleCamp extends ExtendWTraits(GameObject) {

	constructor(options) {
		super(options);

		options.monsters.forEach((v, i) => {
			new Monster({
				teamName: options.teamName,
				num: i,
				position: v.position,
				info: v.info,
				character: v.character,
				spawner: this,
			});
		});

		this.notifyCreate();
		this.notifyActivate();
	}

	notifyCreate() {
		var CreateMinionCamp = global.Network.createPacket('CreateMinionCamp');
		CreateMinionCamp.position = this.position;
		CreateMinionCamp.campIndex = this.num;
		global.Teams.ALL.sendPacket(CreateMinionCamp, loadingStages.LOADING);
	}

	notifyActivate() {
		var ActivateMinionCamp = global.Network.createPacket('ActivateMinionCamp');
		ActivateMinionCamp.position = this.position;
		ActivateMinionCamp.campIndex = this.num;
		global.Teams.ALL.sendPacket(ActivateMinionCamp, loadingStages.LOADING);
	}

	notifyDeactivate() {
		var Neutral_Camp_Empty = global.Network.createPacket('Neutral_Camp_Empty');
		Neutral_Camp_Empty.campIndex = this.num;
		global.Teams.ALL.sendPacket(Neutral_Camp_Empty, loadingStages.LOADING);
	}

	/**
	 * 
	 * @param {Object} spawnList
	 */
	static spawnAll(spawnList = JungleCamps) {
		for (var teamName in spawnList) {
			for (var num in spawnList[teamName]) {
				var spawn = spawnList[teamName][num];

				new JungleCamp({
					teamName, num,
					netId: spawn.netId,
					character: spawn.character,
					spawnPosition: spawn.position || spawn.monsters[0].position,
					monsters: spawn.monsters,
				});
			}
		}
	}
};
