
const loadingStages = require('../../Constants/loadingStages');
var GameComponents = {
	Spawn: require('../Components/Spawn'),
	//Fountain: require('../Components/Fountain'),
	MovementSimulation: require('../Components/MovementSimulation'),
};


class Game {
	static initialize(){
		Game.initGame();
	}


	static async run(){
		GameComponents.Spawn();
		//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

	}

	static start(){
		global.Game.started = Date.now() / 1000;
		global.Game.paused = false;
		
		Game.run();
	}

	static async startWhenReady(){
		global.Movement = new GameComponents.MovementSimulation();
		global.Movement.start();

		while(!global.Game.started){
			await global.Utilities.wait(100);

			if(!global.Units.BLUE.Player || Object.keys(global.Units.BLUE.Player).length === 0){
				console.log('[weird] players has been not initialized yet?');
				continue;
			}

			//if(global.Game.initialized + 300 < Date.now() / 1000)
			//	start_game();// start game if 5 minutes passed
			//else{
			//	let playersLoaded = true;
			//	for(let i in global.Units['ALL'].Player){
			//		if(global.Units['ALL'].Player[i].loadingStage < loadingStages.LOADED){
			//			playersLoaded = false;
			//			break;
			//		}
			//	}
			//	if(playersLoaded)
			//		start_game();// or all players has loaded
			//}
			if(global.command_START_GAME)
				Game.start();
		}
		
	}
	static async initGame(){


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

		Game.startWhenReady();
		
	}
}

module.exports = Game;
