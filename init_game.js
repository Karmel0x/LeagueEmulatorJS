
const loadingStages = require('./Constants/loadingStages');
var GameComponents = {
	Spawn: require('./Game/Spawn'),
	//Fountain: require('./Game/Fountain'),
	MovementSimulation: require('./Classes/Movement/Simulation'),
};

async function run_game(){
	GameComponents.Spawn();
	//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

}

function start_game(){
	global.Game.started = Date.now() / 1000;
	global.Game.paused = false;
	
	run_game();
}

// depends on './init_players'
async function wait_start_game(){
	global.Movement = new GameComponents.MovementSimulation();
	global.Movement.start();

	while(!global.Game.started){
		await global.Utilities.wait(100);

		if(!global.Units.BLUE.PLAYER || Object.keys(global.Units.BLUE.PLAYER).length === 0){
			console.log('[weird] players has been not initialized yet?');
			continue;
		}

		//if(global.Game.initialized + 300 < Date.now() / 1000)
		//	start_game();// start game if 5 minutes passed
		//else{
		//	let playersLoaded = true;
		//	for(let i in global.Units['ALL'].PLAYER){
		//		if(global.Units['ALL'].PLAYER[i].loadingStage < loadingStages.LOADED){
		//			playersLoaded = false;
		//			break;
		//		}
		//	}
		//	if(playersLoaded)
		//		start_game();// or all players has loaded
		//}
		if(global.command_START_GAME)
			start_game();
	}
	
}
async function init_game(){


	global.Game = {
		initialized: Date.now() / 1000,
		started: false,
		paused: true,
	};
	global.Game.Timer = () => {
		//todo: ticker function for setting variables dependent on game time
		if(!global.Game.started)
			return 0;
			
		return Date.now() / 1000 - global.Game.started;
	};

	wait_start_game();
	
}

module.exports = init_game;
