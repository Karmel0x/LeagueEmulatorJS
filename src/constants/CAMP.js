
const CAMP = {
	DRAGON: {
		spawns: [
			['Dragon', { x: 1000, y: 2000 }],
		],
		RespawnTime: 360,
		DelaySpawnTime: 50,
	},
	SMALLGOLEMS: {
		spawns: [
			['SmallGolem', { x: 1000, y: 2000 }],
			['Golem', { x: 1000, y: 2000 }],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	WRAITHS: {
		spawns: [
			['Wraith', { x: 1000, y: 2000 }],
			['LesserWraith', { x: 1000, y: 2000 }],
			['LesserWraith', { x: 1000, y: 2000 }],
			['LesserWraith', { x: 1000, y: 2000 }],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	REDBUFF: {
		spawns: [
			['LizardElder', { x: 1000, y: 2000 }],
			['YoungLizard', { x: 1000, y: 2000 }],
			['YoungLizard', { x: 1000, y: 2000 }],
		],
		RespawnTime: 300,
		DelaySpawnTime: 15,
	},
	WOLVES: {
		spawns: [
			['GiantWolf', { x: 1000, y: 2000 }],
			['Wolf', { x: 1000, y: 2000 }],
			['Wolf', { x: 1000, y: 2000 }],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	BLUEBUFF: {
		spawns: [
			['AncientGolem', { x: 1000, y: 2000 }],
			['YoungLizard', { x: 1000, y: 2000 }],
			['YoungLizard', { x: 1000, y: 2000 }],
		],
		RespawnTime: 300,
		DelaySpawnTime: 15,
	},
	OWLBEAR: {
		spawns: [
			['GreatWraith', { x: 1000, y: 2000 }],
		],
		RespawnTime: 50,
		DelaySpawnTime: 25,
	},
	NASHOR: {
		spawns: [
			['Worm', { x: 1000, y: 2000 }],
		],
		RespawnTime: 420,
		DelaySpawnTime: 800,
	},
};

export default CAMP;
