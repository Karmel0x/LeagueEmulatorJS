import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';


export enum BuffType {
	internal = 0x0,
	aura = 0x1,
	combatEnchancer = 0x2,
	combatDehancer = 0x3,
	spellShield = 0x4,
	stun = 0x5,
	invisibility = 0x6,
	silence = 0x7,
	taunt = 0x8,
	polymorph = 0x9,
	slow = 0xa,
	snare = 0xb,
	damage = 0xc,
	heal = 0xd,
	haste = 0xe,
	spellImmunity = 0xf,
	physicalImmunity = 0x10,
	invulnerability = 0x11,
	sleep = 0x12,
	nearSight = 0x13,
	frenzy = 0x14,
	fear = 0x15,
	charm = 0x16,
	poison = 0x17,
	suppression = 0x18,
	blind = 0x19,
	counter = 0x1a,
	shred = 0x1b,
	flee = 0x1c,
	knockup = 0x1d,
	knockback = 0x1e,
	disarm = 0x1f,
}

export type BuffInGroupAddModel = {
	ownerNetId: NetId,
	casterNetId: NetId,
	slot: number,
	count: number,
	isHidden: boolean,
};

export type BuffAddGroupModel = BasePacketModel & {
	type: BuffType,
	nameHash: number,
	packageHash: number,
	runningTime: number,
	duration: number,
	entries: BuffInGroupAddModel[],
};

export default class BuffAddGroup extends BasePacket {
	static create(payload: Partial<BuffAddGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffAddGroupModel) {
		super.reader(dvr, payload);

		payload.type = dvr.readUint8();
		payload.nameHash = dvr.readUint32();
		payload.packageHash = dvr.readUint32();
		payload.runningTime = dvr.readFloat();
		payload.duration = dvr.readFloat();

		let count = dvr.readUint8();
		payload.entries = dvr.readArray(() => ({
			ownerNetId: dvr.readUint32(),
			casterNetId: dvr.readUint32(),
			slot: dvr.readUint8(),
			count: dvr.readUint8(),
			isHidden: dvr.readBool(),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: BuffAddGroupModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.type);
		dvr.writeUint32(payload.nameHash);
		dvr.writeUint32(payload.packageHash);
		dvr.writeFloat(payload.runningTime);
		dvr.writeFloat(payload.duration);

		payload.entries = payload.entries || [];
		dvr.writeUint8(payload.entries.length);
		payload.entries.forEach(entry => {
			dvr.writeUint32(entry.ownerNetId);
			dvr.writeUint32(entry.casterNetId);
			dvr.writeUint8(entry.slot);
			dvr.writeUint8(entry.count);
			dvr.writeBool(entry.isHidden);
		});
	}
}
