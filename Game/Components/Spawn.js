
async function spawnMinions(spawnMinions_count){
	console.log('Minions spawn - wave', spawnMinions_count);

	for(let i = 0; i < 3; i++){
		global.Barracks['BLUE'][i].spawnWave();
		global.Barracks['RED'][i].spawnWave();
	}
}
async function wait_spawnMinions(){
	//return;///////////
	
	var spawnMinions_next = global.Game.started + 9.0;
	var spawnMinions_count = 0;

	for(;;){
		while(spawnMinions_next > Date.now() / 1000)
			await Promise.wait(100);

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
//		await Promise.wait(10);
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
