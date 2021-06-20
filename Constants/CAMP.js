
const CAMP = {
	DRAGON: {
		spawns: [
			['Dragon', {X: 1000, Y: 2000}],
		],
		RespawnTime: 360,
		DelaySpawnTime: 50,
	},
	SMALLGOLEMS: {
		spawns: [
			['SmallGolem', {X: 1000, Y: 2000}],
			['Golem', {X: 1000, Y: 2000}],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	WRAITHS: {
		spawns: [
			['Wraith', {X: 1000, Y: 2000}],
			['LesserWraith', {X: 1000, Y: 2000}],
			['LesserWraith', {X: 1000, Y: 2000}],
			['LesserWraith', {X: 1000, Y: 2000}],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	REDBUFF: {
		spawns: [
			['LizardElder', {X: 1000, Y: 2000}],
			['YoungLizard', {X: 1000, Y: 2000}],
			['YoungLizard', {X: 1000, Y: 2000}],
		],
		RespawnTime: 300,
		DelaySpawnTime: 15,
	},
	WOLVES: {
		spawns: [
			['GiantWolf', {X: 1000, Y: 2000}],
			['Wolf', {X: 1000, Y: 2000}],
			['Wolf', {X: 1000, Y: 2000}],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	BLUEBUFF: {
		spawns: [
			['AncientGolem', {X: 1000, Y: 2000}],
			['YoungLizard', {X: 1000, Y: 2000}],
			['YoungLizard', {X: 1000, Y: 2000}],
		],
		RespawnTime: 300,
		DelaySpawnTime: 15,
	},
	OWLBEAR: {
		spawns: [
			['GreatWraith', {X: 1000, Y: 2000}],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	NASHOR: {
		spawns: [
			['Worm', {X: 1000, Y: 2000}],
		],
		RespawnTime: 420,
		DelaySpawnTime: 800,
	},
};

module.exports = CAMP;
