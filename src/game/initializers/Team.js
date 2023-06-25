
const Server = require('../../app/Server');
const UnitList = require('../../app/UnitList');
const TEAM = require('../../constants/TEAM');
const loadingStages = require('../../constants/loadingStages');


class Team {
	constructor(teamName) {
		this.teamName = teamName;
		//this.Player = {};
		//this.Unit = {};
		//this.Turret = {};
		//this.Minion = {};
	}

	static createAll() {
		Server.teams['BLUE'] = new Team('BLUE');
		Server.teams['RED'] = new Team('RED');
		Server.teams['NEUTRAL'] = new Team('NEUTRAL');
		Server.teams['ALL'] = new Team('ALL');

		Server.teams[TEAM['BLUE']] = Server.teams['BLUE'];
		Server.teams[TEAM['RED']] = Server.teams['RED'];
		Server.teams[TEAM['NEUTRAL']] = Server.teams['NEUTRAL'];
	}

	static initialize() {
		Team.createAll();
	}

	sendPacket_withVision(packet) {
		//todo
		this.sendPacket(packet);
	}

	sendPacket(packet, minStage = loadingStages.IN_GAME) {
		//var peerNums = [];
		var players = [];
		var teamPlayerUnits = UnitList.getUnitsF(this.teamName, 'Player');
		for (var i = 0, l = teamPlayerUnits.length; i < l; i++) {
			var player = teamPlayerUnits[i];

			if (player.loadingStage < minStage)
				continue;

			//if(typeof player.peerNum == 'undefined'){
			//	//var cPacket = JSON.parse(JSON.stringify(packet));
			//	//player.storePacket(cPacket);
			//	continue;
			//}

			//peerNums.push(player.peerNum);
			players.push(player);
		}

		//if(peerNums.length > 0)
		//	sendPacket(peerNums, packet);
		if (players.length > 0)
			Server.network.sendPacketP(players, packet);
	}

	showUnit(unit) {
		var OnEnterVisibilityClient = Server.network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = unit.netId;
		OnEnterVisibilityClient.shieldValues = {
			magical: 0,
			physical: 0,
			magicalAndPhysical: 0,
		};
		OnEnterVisibilityClient.lookAtPosition = { x: 1, y: 0, z: 0 };
		OnEnterVisibilityClient.characterStackData = [
			{
				skinName: unit.character.model
			}
		];
		OnEnterVisibilityClient.movementData = unit.movementData;
		this.sendPacket(OnEnterVisibilityClient);
		//console.log(OnEnterVisibilityClient);
	}

	hideUnit(unit) {
		var OnLeaveVisibilityClient = Server.network.createPacket('OnLeaveVisibilityClient');
		OnLeaveVisibilityClient.netId = unit.netId;
		this.sendPacket(OnLeaveVisibilityClient);
	}

	vision(target, enters = true) {
		if (target.type == 'Nexus' || target.type == 'Inhibitor' || target.type == 'Turret')
			return;

		//console.log('vision', target);
		if (enters) {
			console.debug('enters vision', this.teamName, target.constructor.name, target.netId);
			this.showUnit(target);
		} else {
			console.debug('leaves vision', this.teamName, target.constructor.name, target.netId);
			this.hideUnit(target);
		}

	}
}


module.exports = Team;
