var ConstantsUnit = require('../../Constants/Unit');
const {createPacket, sendPacket, sendPacketP} = require("../../Core/PacketUtilities");
const TEAM = require('../../Constants/TEAM');
const loadingStages = require('../../Constants/loadingStages');


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
		global.Teams['NEUTRAL'] = new Team('NEUTRAL');
		global.Teams['ALL'] = new Team('ALL');
	}
	static initialize(){
		Team.createAll();
	}
	
	sendPacket_withVision(packet){
		//todo
		this.sendPacket(packet);
	}
	sendPacket(packet, minStage = loadingStages.IN_GAME){
		//var peer_nums = [];
		var players = [];
		var teamPlayerUnits = global.getUnitsF(this.team, 'Player');
		for(let player_num in teamPlayerUnits){
			var player = teamPlayerUnits[player_num];
			
			if(player.loadingStage < minStage)
				continue;

			//if(typeof player.peer_num == 'undefined'){
			//	//var cPacket = JSON.parse(JSON.stringify(packet));
			//	//player.storePacket(cPacket);
			//	continue;
			//}

			//peer_nums.push(player.peer_num);
			players.push(player);
		}

		//if(peer_nums.length > 0)
		//	sendPacket(peer_nums, packet);
		if(players.length > 0)
			sendPacketP(players, packet);
	}

	showUnit(unit){
		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.netId = unit.netId;
		OBJECT_SPAWN.ShieldValues = {
			Magical: 0,
			Physical: 0,
			MagicalAndPhysical: 0,
		};
		OBJECT_SPAWN.LookAtPosition = {x: 1, y: 0, z: 0};
		OBJECT_SPAWN.CharacterStackData = [
			{
				SkinName: unit.character.model
			}
		];
		OBJECT_SPAWN.MovementData = unit.MovementData;
		var isSent = this.sendPacket(OBJECT_SPAWN);
		//console.log(OBJECT_SPAWN);
	}
	hideUnit(unit){
		var LEAVE_VISION = createPacket('LEAVE_VISION');
		LEAVE_VISION.netId = unit.netId;
		var isSent = this.sendPacket(LEAVE_VISION);
	}
	vision(target, enters = true){
		if(target.type == 'Nexus' || target.type == 'Inhibitor' || target.type == 'Turret')
			return;

		//console.log('vision', target);
		if(enters){
			console.debug('enters vision', this.team, target.constructor.name, target.netId);
			this.showUnit(target);
		}else{
			console.debug('leaves vision', this.team, target.constructor.name, target.netId);
			this.hideUnit(target);
		}

	}
}


module.exports = Team;
