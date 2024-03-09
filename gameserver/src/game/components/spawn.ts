import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';


async function spawnMinions(count: number) {
	console.log('Minions spawn - wave', count);

	GameObjectList.barracks.forEach(barrack => {
		barrack.spawnWave();
	});
}

async function wait_spawnMinions() {
	//return;///////////

	let next = Server.game.started + 9.0;
	let count = 0;

	for (; ;) {
		while (next > Date.now() / 1000)
			await Promise.delay(100);

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
//		await Promise.delay(10);
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
