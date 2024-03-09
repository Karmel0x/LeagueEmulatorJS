
import * as packets from '@workspace/packets/packages/packets';
import Server from '../../../app/server';
import loadingStages from '../../../constants/loading-stages';
import { TeamId } from '../traits/team';
import type Unit from '../../units/unit';
import { PacketMessage } from '@workspace/network/packages/packets/packet';
import { NetId } from '@workspace/packets/packages/packets/types/player';
import { Vector2 } from 'three';
import TranslateCenteredCoordinates from '@workspace/packets/packages/packets/functions/translate-centered-coordinates';
import GameObjectList from '../../../app/game-object-list';

export default class PUnit {
	owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	toSelf(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {

	}

	toEveryone(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max].sendPacket(packet, minStage);
	}

	toVision(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max].sendPacket_withVision(packet, minStage);
	}

	toTeam(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[this.owner.team.id]?.sendPacket(packet, minStage);
	}

	toLoading(packet: PacketMessage | undefined) {
		//Server.teams[TeamId.max].sendPacket(packet, loadingStages.loading);
		Server.teams[TeamId.max].sendPacket(packet, loadingStages.notConnected);
	}

	OnEnterLocalVisibilityClient() {
		const packet1 = packets.OnEnterLocalVisibilityClient.create({
			netId: this.owner.netId,
			health: this.owner.stats.health.total,
			currentHealth: this.owner.stats.health.current,
		});
		this.owner.packets.toEveryone(packet1, loadingStages.notConnected);
		//console.log(packet1);
	}

	ChangeCharacterData(character: string) {
		const packet1 = packets.ChangeCharacterData.create({
			netId: this.owner.netId,
			overrideSpells: true,
			modelOnly: false,
			replaceCharacterPackage: true,
			id: 0,
			skinId: 0,
			skinName: character,
		});
		this.owner.packets.toVision(packet1);
	}

	SetAnimStates(animPairs: [string, string][]) {
		const packet1 = packets.SetAnimStates.create({
			netId: this.owner.netId,
			overrides: animPairs.map(pair => {
				return {
					from: pair[0],
					to: pair[1],
				};
			}),
		});
		this.owner.packets.toVision(packet1);
	}

	// 497252 = root
	AddParticleTarget(packageHash: number, effectNameHash: number, boneNameHash = 497252, target: { netId?: NetId, position: Vector2 } | undefined = undefined) {

		let ownerPositionCC = TranslateCenteredCoordinates.to([this.owner.position])[0];
		let targetPositionCC = target ? TranslateCenteredCoordinates.to([target.position])[0] : ownerPositionCC;

		const packet1 = packets.FX_Create_Group.create({
			netId: 0,//this.netId;
			groupData: [{
				packageHash: packageHash,
				effectNameHash: effectNameHash,
				flags: 32,
				targetBoneNameHash: 0,
				boneNameHash: boneNameHash,
				createData: [{
					targetNetId: target?.netId || 0,//this.netId,
					netAssignedNetId: ++GameObjectList.lastNetId,//?
					casterNetId: 0,//this.netId,
					bindNetId: this.owner.netId,
					keywordNetId: 0,//this.netId,
					timeSpent: 0,
					scriptScale: 1,
					position: {
						x: ownerPositionCC.x,
						y: ownerPositionCC.y,
						z: 50,
					},
					ownerPosition: {
						x: ownerPositionCC.x,
						y: ownerPositionCC.y,
						z: 50,
					},
					targetPosition: {
						x: targetPositionCC.x,
						y: targetPositionCC.y,
						z: 0,
					},
					orientationVector: {
						x: 0,
						y: 0,
						z: 0,
					},
				}],
			}],
		});

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
		//console.log(packet1.FXCreateGroupData[0].FXCreateData);
	}

}
