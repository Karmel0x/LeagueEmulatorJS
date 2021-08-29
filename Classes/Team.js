var ConstantsUnit = require('../Constants/Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");
const TEAM = require('../Constants/TEAM');
const loadingStages = require('../Constants/loadingStages');


global.Teams = global.Teams || {};

class Team {
	constructor(team){
		this.team = team;
		//this.Player = {};
		//this.Unit = {};
		//this.Turret = {};
		//this.Minion = {};
	}
	static createAll(){
		global.Teams['BLUE'] = new Team('BLUE');
		global.Teams['RED'] = new Team('RED');
		global.Teams['ALL'] = new Team('ALL');
	}
	
	sendPacket_withVision(packet){
		//todo
		this.sendPacket(packet);
	}
	sendPacket(packet, minStage = loadingStages.IN_GAME){
		for(let player_num in global.Units[this.team].Player)
			global.Units[this.team].Player[player_num].sendPacket(packet, minStage);
	}
	vision(target, enters = true){
		if(target.info.type == 'Nexus' || target.info.type == 'Inhibitor' || target.info.type == 'Turret')
			return;

		//console.log('vision', target);
		if(enters){
			console.debug('enters vision', this.team, target.netId);

			var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
			OBJECT_SPAWN.netId = target.netId;
			OBJECT_SPAWN.ShieldValues = {
				Magical: 0,
				Physical: 0,
				MagicalAndPhysical: 0,
			};
			OBJECT_SPAWN.LookAtPosition = {x: 1, y: 0, z: 0};
			OBJECT_SPAWN.CharacterStackData = [
				{
					SkinName: target.character.model
				}
			];
			OBJECT_SPAWN.MovementData = target.MovementData;
			var isSent = this.sendPacket(OBJECT_SPAWN, loadingStages.IN_GAME);
			//console.log(OBJECT_SPAWN.MovementData);

			//var SET_HEALTH = createPacket('SET_HEALTH');
			//SET_HEALTH.netId = target.netId;
			//SET_HEALTH.count = 0;
			//var isSent = this.sendPacket(SET_HEALTH);
		}else{
			console.debug('leaves vision', this.team, target.netId);

			var LEAVE_VISION = createPacket('LEAVE_VISION');
			LEAVE_VISION.netId = target.netId;
			var isSent = this.sendPacket(LEAVE_VISION, loadingStages.IN_GAME);
		}

	}
}


module.exports = Team;
