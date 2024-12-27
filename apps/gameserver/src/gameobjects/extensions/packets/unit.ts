
import { Vector2 } from '@repo/geometry';
import { PacketMessage } from '@repo/network/packets/packet';
import type { FXCreateDataModel } from '@repo/packets/base/s2c/0x87-FX_Create_Group';
import HashString from '@repo/packets/functions/hash-string';
import TranslateCenteredCoordinates from '@repo/packets/functions/translate-centered-coordinates';
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import { NetId } from '@repo/packets/types/player';
import GameObjectList from '../../../app/game-object-list';
import Server from '../../../app/server';
import loadingStages from '../../../constants/game-state';
import type { Player } from '../../unit-ai';
import type AttackableUnit from '../../units/attackable-unit';
import { TeamId } from '../traits/team';

export default class PUnit {
	readonly owner;

	constructor(owner: AttackableUnit) {
		this.owner = owner;
	}

	toSelf(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		(this.owner.ai as Player)?.network?.sendPacket(packet, minStage);
	}

	toEveryone(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max]?.sendPacket(packet, minStage);
	}

	toVision(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max]?.sendPacket_withVision(packet, minStage);
	}

	toTeam(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[this.owner.team.id]?.sendPacket(packet, minStage);
	}

	toLoading(packet: PacketMessage | undefined) {
		//Server.teams[TeamId.max].sendPacket(packet, loadingStages.loading);
		Server.teams[TeamId.max]?.sendPacket(packet, loadingStages.notConnected);
	}

	OnEnterLocalVisibilityClient(to: (packet: PacketMessage | undefined) => void = (packet) => this.owner.packets.toEveryone(packet)) {
		const packet1 = packets.OnEnterLocalVisibilityClient.create({
			netId: this.owner.netId,
			health: this.owner.stats.health.total,
			currentHealth: this.owner.stats.health.current,
		});
		to(packet1);
		//console.log(packet1);
	}

	ChangeCharacterData(character: string) {
		const packet1 = packets.ChangeCharacterData.create({
			netId: this.owner.netId,
			//overrideSpells: true,
			//modelOnly: false,
			//replaceCharacterPackage: true,
			id: 0,
			//skinId: 0,
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
	AddParticleTarget(packageHash: number, effectNameHash: number | string, boneNameHash: number | string = 497252, target: { netId?: NetId, position: Vector2 } | undefined = undefined, data: FXCreateDataModel | undefined = undefined) {

		const ownerPositionCC = TranslateCenteredCoordinates.to([this.owner.position])[0]!;
		const targetPositionCC = target ? TranslateCenteredCoordinates.to([target.position])[0]! : ownerPositionCC;

		if (typeof effectNameHash === 'string') {
			const effectName = effectNameHash.split('.')[0];
			effectNameHash = HashString.HashString2(effectName || '');
		}

		if (typeof boneNameHash === 'string')
			boneNameHash = HashString.HashString(boneNameHash);

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
					...data,
				}],
			}],
		});

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
		//console.log(packet1.FXCreateGroupData[0].FXCreateData);

		const effectId = null;
		return effectId;
	}

	Die(source: AttackableUnit) {
		const packet1 = packets.Die.create({
			netId: this.owner.netId,
			killerNetId: source.netId,
			damageType: DamageType.physical,
			damageSource: DamageSource.attack,
			deathDuration: 0,
			becomeZombie: false,
		});
		this.owner.packets.toEveryone(packet1);
	}
}
