var playersConfig = require('./Constants/playersConfig');
var Player = require('./Classes/Units/Player');


function init_players(){
    for(let i in playersConfig)
        for(let j in playersConfig[i])
            new Player(i, j, playersConfig[i][j]);
}

module.exports = init_players;
