var ConstantsUnit = require('../../Constants/Unit');
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

		global.Teams[TEAM['BLUE']] = global.Teams['BLUE'];
		global.Teams[TEAM['RED']] = global.Teams['RED'];
		global.Teams[TEAM['NEUTRAL']] = global.Teams['NEUTRAL'];
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
			global.Network.sendPacketP(players, packet);
	}

	showUnit(unit){
		var OnEnterVisibilityClient = global.Network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = unit.netId;
		OnEnterVisibilityClient.shieldValues = {
			magical: 0,
			physical: 0,
			magicalAndPhysical: 0,
		};
		OnEnterVisibilityClient.lookAtPosition = {x: 1, y: 0, z: 0};
		OnEnterVisibilityClient.characterStackData = [
			{
				skinName: unit.character.model
			}
		];
		OnEnterVisibilityClient.movementData = unit.movementData;
		this.sendPacket(OnEnterVisibilityClient);
		//console.log(OnEnterVisibilityClient);
	}
	hideUnit(unit){
		var OnLeaveVisibilityClient = global.Network.createPacket('OnLeaveVisibilityClient');
		OnLeaveVisibilityClient.netId = unit.netId;
		this.sendPacket(OnLeaveVisibilityClient);
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
