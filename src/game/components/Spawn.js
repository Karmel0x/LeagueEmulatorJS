import Server from '../../app/Server.js';
import UnitList from '../../app/UnitList.js';
import Team from '../../gameobjects/extensions/traits/Team.js';

/**
 * 
 * @param {number} spawnMinions_count 
 */
async function spawnMinions(spawnMinions_count) {
	console.log('Minions spawn - wave', spawnMinions_count);

	for (let i = 0; i < 3; i++) {
		UnitList.barracks[Team.TEAM_BLUE][i].spawnWave();
		UnitList.barracks[Team.TEAM_RED][i].spawnWave();
	}
}

async function wait_spawnMinions() {
	//return;///////////

	let spawnMinions_next = Server.game.started + 9.0;
	let spawnMinions_count = 0;

	for (; ;) {
		while (spawnMinions_next > Date.now() / 1000)
			await Promise.wait(100);

		spawnMinions_next = Date.now() / 1000 + 30;
		spawnMinions(++spawnMinions_count);
	}
}

//async function spawnMonsters(spawnMinions_count) {
//	console.log('Monsters spawn - wave', spawnMinions_count);
//
//
//}
//
//async function wait_spawnMonsters() {
//	let spawnMonsters_next = Server.game.started + 11.0;//test:110
//	let spawnMonsters_count = 0;
//
//	for (; ;) {
//		await Promise.wait(10);
//
//		while (spawnMonsters_next > Date.now() / 1000)
//			continue;
//
//		spawnMonsters_next = Date.now() / 1000 + 3.0;//test:30
//		spawnMonsters(++spawnMonsters_count);
//	}
//}


export default async () => {

	wait_spawnMinions();

};
