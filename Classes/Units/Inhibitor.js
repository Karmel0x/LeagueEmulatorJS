var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const loadingStages = require("../../Constants/loadingStages");
const { Vector2 } = require('three');

const Inhibitors = {
	BLUE: [
		{netId: 0xFFD23C3E, position: {x:  823.7, y: 3361.6}},//4291968062
		{netId: 0xFF4A20F1, position: {x: 2785.5, y: 2958.2}},//4283048177
		{netId: 0xFF9303E1, position: {x: 3036.3, y: 1017.6}},//4287824865
	],
	RED: [
		{netId: 0xFF6793D0, position: {x: 10958.791, y: 13434.588}},//4284978128
		{netId: 0xFFFF8F1F, position: {x: 11238.580, y: 11470.119}},//4294938399
		{netId: 0xFF26AC0F, position: {x: 13208.756, y: 11174.174}},//4280724495
	]
};


class Inhibitor extends Unit {
	attackableUnit = false;
	constructor(team, num = 0, character = '', config = {}){
		super(team, num, character, config);

		this.initialized();
	}
	spawn(){
		let pos = Inhibitors[this.info.team][this.info.num].position;
		this.Waypoints[0] = new Vector2(pos.x, pos.y);

		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.netId = this.netId;
		OBJECT_SPAWN.isTurret = true;
		var isSent = global.Teams.ALL.sendPacket(OBJECT_SPAWN, loadingStages.NOT_CONNECTED);

		super.spawn();
	}
	static spawnAll(){
		for(let team in Inhibitors)
			for(let num = 0; num < Inhibitors[team].length; num++)
				new Inhibitor(team, num, '', {netId: Inhibitors[team][num].netId || 0xFF000000});
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


module.exports = Inhibitor;
