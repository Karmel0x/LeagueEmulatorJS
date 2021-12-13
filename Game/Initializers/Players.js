var playersConfig = require('../../Constants/playersConfig');
var Player = require('../Units/Player');

class Players {
	static initialize(){
		for(let team in playersConfig)
			for(let num in playersConfig[team])
				Player.create(team, num, playersConfig[team][num]);
	}
}

module.exports = Players;
