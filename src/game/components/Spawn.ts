import Server from '../../app/Server';
import UnitList from '../../app/UnitList';
import Team from '../../gameobjects/extensions/traits/Team';

async function spawnMinions(count: number) {
	console.log('Minions spawn - wave', count);

	for (let i = 0; i < 3; i++) {
		UnitList.barracks[Team.TEAM_BLUE][i].spawnWave();
		UnitList.barracks[Team.TEAM_RED][i].spawnWave();
	}
}

async function wait_spawnMinions() {
	//return;///////////

	let next = Server.game.started + 9.0;
	let count = 0;

	for (; ;) {
		while (next > Date.now() / 1000)
			await Promise.wait(100);

		next = Date.now() / 1000 + 30;
		spawnMinions(++count);
	}
}

//async function spawnMonsters(count) {
//	console.log('Monsters spawn - wave', count);
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
