
import type { PacketMessages } from '@repo/network/network';
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import Server from '../../app/server';
import loadingStages from '../../constants/game-state';
import type { Player } from '../../gameobjects/unit-ai';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { TeamId } from '../traits/team';

export default class PUnit {
	readonly owner;

	constructor(owner: AttackableUnit) {
		this.owner = owner;
	}

	toSelf(packet: PacketMessages, minStage = loadingStages.inGame) {
		(this.owner.ai as Player)?.network?.sendPacket(packet, minStage);
	}

	toEveryone(packet: PacketMessages, minStage = loadingStages.inGame) {
		Server.teams[TeamId.all]?.sendPacket(packet, minStage);
	}

	toVision(packet: PacketMessages, minStage = loadingStages.inGame) {
		Server.teams[TeamId.all]?.sendPacket_withVision(packet, minStage);
	}

	toTeam(packet: PacketMessages, minStage = loadingStages.inGame) {
		Server.teams[this.owner.team.id]?.sendPacket(packet, minStage);
	}

	toLoading(packet: PacketMessages) {
		//Server.teams[TeamId.all].sendPacket(packet, loadingStages.loading);
		Server.teams[TeamId.all]?.sendPacket(packet, loadingStages.notConnected);
	}

	OnEnterLocalVisibilityClient() {
		const owner = this.owner;
		if (owner.characterState.noRender || owner.character.neverRender)
			return;

		const packet1 = packets.OnEnterLocalVisibilityClient.create({
			netId: owner.netId,
			health: owner.stats.health.total,
			currentHealth: owner.stats.health.current,
		});
		//console.log(packet1);
		return packet1;
	}

	sendOnEnterLocalVisibilityClient() {
		const owner = this.owner;
		const packet1 = this.OnEnterLocalVisibilityClient();
		owner.packets.toVision(packet1);
	}

	ChangeCharacterData(character: string) {
		const owner = this.owner;

		const packet1 = packets.ChangeCharacterData.create({
			netId: owner.netId,
			//overrideSpells: true,
			//modelOnly: false,
			//replaceCharacterPackage: true,
			id: 0,
			//skinId: 0,
			skinName: character,
		});
		owner.packets.toVision(packet1);
	}

	SetAnimStates(animPairs: [string, string][]) {
		const owner = this.owner;

		const packet1 = packets.SetAnimStates.create({
			netId: owner.netId,
			overrides: animPairs.map(pair => {
				return {
					from: pair[0],
					to: pair[1],
				};
			}),
		});
		owner.packets.toVision(packet1);
	}

	Die(source: AttackableUnit) {
		const owner = this.owner;

		const packet1 = packets.Die.create({
			netId: owner.netId,
			killerNetId: source.netId,
			damageType: DamageType.physical,
			damageSource: DamageSource.attack,
			deathDuration: 0,
			becomeZombie: false,
		});
		owner.packets.toEveryone(packet1);
	}

	FaceDirection() {
		const owner = this.owner;

		const packet1 = packets.FaceDirection.create({
			netId: owner.netId,
			direction: owner.direction,
		});
		owner.packets.toVision(packet1);
	}
}
