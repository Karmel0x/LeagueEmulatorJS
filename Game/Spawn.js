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
	//		new Minion('RED', j, 'SUPER_MINION?');
	//}

	// 2. Malee minions
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			new Minion('BLUE', j, 'MALEE');
			new Minion('RED', j, 'MALEE');
			//break;//
		}
		await global.Utilities.wait(800);
	}

	// 3. Siege minions
	if(spawnMinions_count % 3 == 2){//One Siege minion spawns in every third wave, in each lane.
		for(let j = 0; j < 3; j++){
			if(!superMinionsSpawn['BLUE'][j])//Do not spawns on lanes on which super minions are spawning.
				new Minion('BLUE', j, 'CANNON');
			if(!superMinionsSpawn['RED'][j])
				new Minion('RED', j, 'CANNON');
			//break;//
		}
		await global.Utilities.wait(800);
	}

	// 4. Caster minions
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			new Minion('BLUE', j, 'CASTER');
			new Minion('RED', j, 'CASTER');
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
