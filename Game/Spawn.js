const Minion = require("../Classes/Units/Minion");
const CAMP = require("../Constants/CAMP");

async function spawnMinions(spawnMinions_count){
	console.log('Minions spawn - wave', spawnMinions_count);

	// 1. Super minions
	let superMinionsSpawn = {
		BLUE: [false, false, false],
		RED: [false, false, false],
	};
	//todo
	//for(let j = 0; j < 3; j++){
	//	if()
	//		new Minion('RED', 'SUPER_MINION?', j);
	//}

	// 2. Malee minions
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			new Minion('BLUE', 'MALEE', j);
			new Minion('RED', 'MALEE', j);
			//break;//
		}
		await global.Utilities.wait(800);
	}

	// 3. Siege minions
	if(spawnMinions_count % 3 == 2){//One Siege minion spawns in every third wave, in each lane.
		for(let j = 0; j < 3; j++){
			if(!superMinionsSpawn['BLUE'][j])//Do not spawns on lanes on which super minions are spawning.
				new Minion('BLUE', 'CANNON', j);
			if(!superMinionsSpawn['RED'][j])
				new Minion('RED', 'CANNON', j);
			//break;//
		}
		await global.Utilities.wait(800);
	}

	// 4. Caster minions
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			new Minion('BLUE', 'CASTER', j);
			new Minion('RED', 'CASTER', j);
			//break;//
		}
		await global.Utilities.wait(800);
	}

}
async function wait_spawnMinions(){
	//return;///////////
	
	var spawnMinions_next = global.Game.started + 9.0;
	var spawnMinions_count = 0;

	for(;;){
		while(spawnMinions_next > Date.now() / 1000)
			await global.Utilities.wait(100);

		spawnMinions_next = Date.now() / 1000 + 30;
		spawnMinions(++spawnMinions_count);
	}
}

//async function spawnMonsters(spawnMinions_count){
//	console.log('Monsters spawn - wave', spawnMinions_count);
//
//
//}
//async function wait_spawnMonsters(){
//	var spawnMonsters_next = global.Game.started + 11.0;//test:110
//	var spawnMonsters_count = 0;
//
//	for(;;){
//		await global.Utilities.wait(10);
//
//		while(spawnMonsters_next > Date.now() / 1000)
//			continue;
//
//		spawnMonsters_next = Date.now() / 1000 + 3.0;//test:30
//		spawnMonsters(++spawnMonsters_count);
//	}
//}

module.exports = async() => {

	wait_spawnMinions();

};
