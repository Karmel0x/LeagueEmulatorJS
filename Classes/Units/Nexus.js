var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const loadingStages = require("../../Constants/loadingStages");
const { Vector2 } = require('three');

const Nexuses = {
	BLUE: {netId: 0xFFF97DB5, position: {x:  1131.728, y:  1426.288}},//4294540725
	RED:  {netId: 0xFFF02C0F, position: {x: 12760.906, y: 13026.066}},//4293929999
};


class Nexus extends Unit {
	attackableUnit = false;
	constructor(team, num = 0, character = '', config = {}){
		super(team, num, character, config);

		this.initialized();
	}
	//onDie(source){
	//    //end game?
	//}
	spawn(){
		let pos = Nexuses[this.info.team].position;
		this.Waypoints[0] = new Vector2(pos.x, pos.y);

		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.netId = this.netId;
		OBJECT_SPAWN.isTurret = true;
		var isSent = global.Teams.ALL.sendPacket(OBJECT_SPAWN, loadingStages.NOT_CONNECTED);

		super.spawn();
	}
	static spawnAll(){
		for(let team in Nexuses)
			new Nexus(team, 0, '', {netId: Nexuses[team].netId || 0xFFF00000});
	}
	SET_HEALTH(){
		var SET_HEALTH = createPacket('SET_HEALTH');
		SET_HEALTH.netId = this.netId;
		SET_HEALTH.count = 0;
		SET_HEALTH.MaxHealth = this.stats.HealthPoints.Total;
		SET_HEALTH.Health = this.stats.CurrentHealth;
		var isSent = global.Teams.ALL.sendPacket(SET_HEALTH, loadingStages.NOT_CONNECTED);
	}
}


module.exports = Nexus;
