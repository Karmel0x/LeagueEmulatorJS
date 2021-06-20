var GameComponents = {
    Spawn: require('./Game/Spawn'),
    //Fountain: require('./Game/Fountain'),
};

async function run_game(){
    GameComponents.Spawn();
    //GameComponents.Fountain();//instead of component, create perma buff for fountain turret

}

function start_game(){
    global.Game.started = Date.now() / 1000;
    global.Game.paused = false;
    global.Game.Timer = () => {
        //todo: ticker function for setting variables dependent on game time
        return Date.now() / 1000 - global.Game.started;
    };
    
    run_game();
}

// depends on './init_players'
async function wait_start_game(){

    while(!global.Game.started){
        await global.Utilities.wait(10);

        if(!global.Players || Object.keys(global.Players).length === 0){
            console.log('[weird] players has been not initialized yet?');
            continue;
        }

        if(global.Game.initialized + 300 < Date.now() / 1000)
            start_game();// start game if 5 minutes passed
        else{
            let playersLoaded = true;
            for(let i in global.Players){
                if(!global.Players[i].loaded){
                    playersLoaded = false;
                    break;
                }
            }
            if(playersLoaded)
                start_game();// or all players has loaded
        }

    }
    
}
async function init_game(){


    global.Game = {
        initialized: Date.now() / 1000,
        started: false,
        paused: true,
    };

    wait_start_game();
    
}

module.exports = init_game;
