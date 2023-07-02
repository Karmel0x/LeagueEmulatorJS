
const Server = require('../../app/Server');
const UnitList = require('../../app/UnitList');
const loadingStages = require('../../constants/loadingStages');
const Team = require('../../gameobjects/extensions/traits/Team');


class Teams {
	constructor(team) {
		this.team = team;
		//this.Player = {};
		//this.Unit = {};
		//this.Turret = {};
		//this.Minion = {};
	}

	static createAll() {
		Server.teams[Team.TEAM_BLUE] = new Teams(Team.TEAM_BLUE);
		Server.teams[Team.TEAM_RED] = new Teams(Team.TEAM_RED);
		Server.teams[Team.TEAM_NEUTRAL] = new Teams(Team.TEAM_NEUTRAL);
		Server.teams[Team.TEAM_MAX] = new Teams(Team.TEAM_MAX);
	}

	static initialize() {
		Teams.createAll();
	}

	sendPacket_withVision(packet) {
		//todo
		this.sendPacket(packet);
	}

	sendPacket(packet, minStage = loadingStages.IN_GAME) {
		//let peerNums = [];
		let players = [];
		let teamPlayerUnits = /** @type {import('../../gameobjects/units/Player')[]} */ (UnitList.getUnitsF(this.team, 'Player'));
		for (let i = 0, l = teamPlayerUnits.length; i < l; i++) {
			let player = teamPlayerUnits[i];

			if (player.network.loadingStage < minStage)
				continue;

			//if(typeof player.network.peerNum == 'undefined'){
			//	//let cPacket = JSON.parse(JSON.stringify(packet));
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

	/**
	 * 
	 * @param {import('../../gameobjects/units/Unit')} unit 
	 */
	showUnit(unit) {
		const OnEnterVisibilityClient = Server.network.createPacket('OnEnterVisibilityClient');
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
		OnEnterVisibilityClient.movementData = unit.moving?.movementData;
		this.sendPacket(OnEnterVisibilityClient);
		//console.log(OnEnterVisibilityClient);
	}

	/**
	 * 
	 * @param {import('../../gameobjects/units/Unit')} unit 
	 */
	hideUnit(unit) {
		const OnLeaveVisibilityClient = Server.network.createPacket('OnLeaveVisibilityClient');
		OnLeaveVisibilityClient.netId = unit.netId;
		this.sendPacket(OnLeaveVisibilityClient);
	}

	/**
	 * 
	 * @param {import('../../gameobjects/units/Unit')} target 
	 */
	vision(target, enters = true) {
		if (target.type == 'Nexus' || target.type == 'Inhibitor' || target.type == 'Turret')
			return;

		//console.log('vision', target);
		if (enters) {
			console.debug('enters vision', this.team, target.constructor.name, target.netId);
			this.showUnit(target);
		} else {
			console.debug('leaves vision', this.team, target.constructor.name, target.netId);
			this.hideUnit(target);
		}

	}
}


module.exports = Teams;
