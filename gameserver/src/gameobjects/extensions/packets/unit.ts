
import * as packets from '@workspace/packets/packages/packets';
import Server from '../../../app/server';
import loadingStages from '../../../constants/loading-stages';
import Team, { TeamId } from '../traits/team';
import type Unit from '../../units/unit';
import { PacketMessage } from '@workspace/network/packages/packets/packet';

export default class PUnit {
	owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	toSelf(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		this.owner.network?.sendPacket(packet, minStage);
	}
	toEveryone(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max].sendPacket(packet, minStage);
	}
	toVision(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[TeamId.max].sendPacket_withVision(packet, minStage);
	}
	toTeam(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		Server.teams[this.owner.team.id].sendPacket(packet, minStage);
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

	skillUpgrade_send(slot: number) {
		const packet1 = packets.UpgradeSpellAns.create({
			netId: this.owner.netId,
			slot: slot,
			level: this.owner.progress.spellLevel[slot],
			pointsLeft: this.owner.progress.skillPoints,
		});
		this.owner.packets.toSelf(packet1);
		//console.debug(packet1);
	}

}
