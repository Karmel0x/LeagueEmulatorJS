var playersConfig = require('./Constants/playersConfig');
var Player = require('./Classes/Player');


function init_players(){
    var Players = {};
    for(let i in playersConfig)
        for(let j in playersConfig[i])
            Players[j] = new Player(playersConfig[i][j], i, j);

    return Players;
}

module.exports = init_players;
