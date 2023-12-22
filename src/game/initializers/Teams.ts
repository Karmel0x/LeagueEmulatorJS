
import packets from '../../packets/index';
import Server from '../../app/Server';
import UnitList from '../../app/UnitList';
import loadingStages from '../../constants/loadingStages';
import Team from '../../gameobjects/extensions/traits/Team';
import Player from '../../gameobjects/units/Player';
import Unit from '../../gameobjects/units/Unit';


export default class Teams {
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
		let teamPlayerUnits = UnitList.getUnitsF(this.team, 'Player') as Player[];
		for (let i = 0, l = teamPlayerUnits.length; i < l; i++) {
			let player = teamPlayerUnits[i];

			if (!player.network)
				continue;
			if (player.network.loadingStage < minStage)
				continue;

			//if(typeof player.network.peerNum === 'undefined'){
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

	showUnit(unit: Unit) {
		const packet1 = new packets.OnEnterVisibilityClient();
		packet1.netId = unit.netId;
		packet1.shieldValues = {
			magical: 0,
			physical: 0,
			magicalAndPhysical: 0,
		};
		packet1.lookAtPosition = { x: 1, y: 0, z: 0 };
		packet1.characterStackData = [
			{
				skinName: unit.character.model
			}
		];
		packet1.movementData = unit.moving?.movementData;
		this.sendPacket(packet1);
		//console.log(packet1);
	}

	hideUnit(unit: Unit) {
		const packet1 = new packets.OnLeaveVisibilityClient();
		packet1.netId = unit.netId;
		this.sendPacket(packet1);
	}

	vision(target: Unit, enters = true) {
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
