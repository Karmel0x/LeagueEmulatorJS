
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import loadingStages from '../../constants/game-state';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type Player from '../../gameobjects/unit-ai/player';
import { AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import type Unit from '../../gameobjects/units/unit';


export default class Teams {
	id;

	constructor(id: TeamId) {
		this.id = id;
	}

	static createAll() {
		Server.teams[TeamId.order] = new Teams(TeamId.order);
		Server.teams[TeamId.chaos] = new Teams(TeamId.chaos);
		Server.teams[TeamId.neutral] = new Teams(TeamId.neutral);
		Server.teams[TeamId.all] = new Teams(TeamId.all);
	}

	static initialize() {
		Teams.createAll();
	}

	sendPacket_withVision(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		//todo
		this.sendPacket(packet, minStage);
	}

	sendPacketTo(players: Player[], packet: PacketMessage) {
		if (players.length < 1)
			return;

		let peers = players.map(player => player.network.peerNum);
		peers = peers.filter(peer => peer >= 0);

		Server.network.sendPacket(peers, packet);
	}

	sendPacket(packet: PacketMessage | undefined, minStage = loadingStages.inGame, maxStage = loadingStages.inGame) {
		if (!packet)
			return;

		const players = Server.players.map(player => player.ai as Player);
		let currentTeamPlayers = players;
		if (this.id !== TeamId.all)
			currentTeamPlayers = currentTeamPlayers.filter(p => p.owner.team.id === this.id);

		const playersToSend: Player[] = [];

		for (let i = 0, l = currentTeamPlayers.length; i < l; i++) {
			const player = currentTeamPlayers[i];
			if (!player)
				continue;

			if (!player.network)
				continue;
			if (player.network.loadingStage < minStage)
				continue;
			if (player.network.loadingStage > maxStage)
				continue;

			//if(typeof player.network.peerNum === 'undefined'){
			//	//let cPacket = JSON.parse(JSON.stringify(packet));
			//	//player.storePacket(cPacket);
			//	continue;
			//}

			playersToSend.push(player);
		}

		this.sendPacketTo(playersToSend, packet);
	}

	showUnit(unit: Unit) {
		// @todo buffs
		const packet1 = packets.OnEnterVisibilityClient.create({
			netId: unit.netId,
			shieldValues: {
				magical: 0,
				physical: 0,
				magicalAndPhysical: 0,
			},
			lookAtPosition: { x: 1, y: 0, z: 0 },
			characterStackData: [{
				skinName: unit.skin,
			}],
			movementData: (unit as AttackableUnit).moving?.movementData,
		});
		this.sendPacket(packet1);
		//console.log(packet1);
	}

	hideUnit(unit: Unit) {
		const packet1 = packets.OnLeaveVisibilityClient.create({
			netId: unit.netId,
		});
		this.sendPacket(packet1);

		// @todo fade when hiding in grass, disable auto fading
		//const packet1 = packets.SetFadeOut_Push.create({
		//	netId: unit.netId,
		//	fadeId: 0,
		//	fadeTime: 0.1,
		//	fadeTargetValue: 0.5,
		//});
		//this.sendPacket(packet1);
	}

	vision(target: AttackableUnit, enters = true) {
		if (target.ai?.type === AiType.Building)
			return;

		//console.log('vision', target);
		if (enters) {
			//console.debug('enters vision', this.id, target.ai?.constructor.name, target.netId);
			this.showUnit(target);
		} else {
			//console.debug('leaves vision', this.id, target.ai?.constructor.name, target.netId);
			this.hideUnit(target);
		}

	}
}
