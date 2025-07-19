import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type SpawnPetModel = BasePacketModel & {
	ownerNetId: NetId,
	netNodeId: number,
	position: SVector3Model,
	castSpellLevelPlusOne: number,
	duration: number,
	team: TeamId,
	damageBonus: number,
	healthBonus: number,
	name: string,
	skinName: string,
	skinId: number,
	buffName: string,
	cloneId: NetId,
	cloneInventory: boolean,
	showMinimapIconIfClone: boolean,
	disallowPlayerControl: boolean,
	doFade: boolean,
	aiScript: string,
};

export default class SpawnPet extends BasePacket {
	static create(payload: Partial<SpawnPetModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		cloneInventory: 1 << 0,
		showMinimapIconIfClone: 1 << 1,
		disallowPlayerControl: 1 << 2,
		doFade: 1 << 3,
	};

	static reader(dvr: RelativeDataView, payload: SpawnPetModel) {
		super.reader(dvr, payload);

		payload.ownerNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.castSpellLevelPlusOne = dvr.readInt32();
		payload.duration = dvr.readFloat();
		payload.team = dvr.readInt32();
		payload.damageBonus = dvr.readInt32();
		payload.healthBonus = dvr.readInt32();
		payload.name = dvr.readCharArray(128);
		payload.skinName = dvr.readCharArray(32);
		payload.skinId = dvr.readInt32();
		payload.buffName = dvr.readCharArray(64);
		payload.cloneId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.cloneInventory = bitfield1.cloneInventory;
		payload.showMinimapIconIfClone = bitfield1.showMinimapIconIfClone;
		payload.disallowPlayerControl = bitfield1.disallowPlayerControl;
		payload.doFade = bitfield1.doFade;

		payload.aiScript = dvr.readStringNullTerminated(32);
	}

	static writer(dvr: RelativeDataView, payload: SpawnPetModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.ownerNetId);
		dvr.writeUint8(payload.netNodeId);
		SVector3.writer(dvr, payload.position);
		dvr.writeInt32(payload.castSpellLevelPlusOne);
		dvr.writeFloat(payload.duration);
		dvr.writeInt32(payload.team);
		dvr.writeInt32(payload.damageBonus);
		dvr.writeInt32(payload.healthBonus);
		dvr.writeCharArray(payload.name, 128);
		dvr.writeCharArray(payload.skinName, 32);
		dvr.writeInt32(payload.skinId);
		dvr.writeCharArray(payload.buffName, 64);
		dvr.writeUint32(payload.cloneId);

		dvr.writeBitfield(this.bitfield1, {
			cloneInventory: payload.cloneInventory,
			showMinimapIconIfClone: payload.showMinimapIconIfClone,
			disallowPlayerControl: payload.disallowPlayerControl,
			doFade: payload.doFade,
		});

		dvr.writeStringNullTerminated(payload.aiScript, 32);
	}
}
