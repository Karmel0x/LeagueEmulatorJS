import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';
import { BuffType } from './0x68-BuffAddGroup';

export type BuffAdd2Model = BasePacketModel & {
	slot: number,
	type: BuffType,
	count: number,
	isHidden: number,
	nameHash: number,
	packageHash: number,
	runningTime: number,
	duration: number,
	casterNetId: NetId,
};

export default class BuffAdd2 extends BasePacket {
	static create(payload: Partial<BuffAdd2Model>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffAdd2Model) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.type = dvr.readUint8();
		payload.count = dvr.readUint8();
		payload.isHidden = dvr.readUint8();
		payload.nameHash = dvr.readUint32();
		payload.packageHash = dvr.readUint32();
		payload.runningTime = dvr.readFloat();
		payload.duration = dvr.readFloat();
		payload.casterNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BuffAdd2Model) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.type);
		dvr.writeUint8(payload.count);
		dvr.writeUint8(payload.isHidden);
		dvr.writeUint32(payload.nameHash);
		dvr.writeUint32(payload.packageHash);
		dvr.writeFloat(payload.runningTime);
		dvr.writeFloat(payload.duration);
		dvr.writeUint32(payload.casterNetId);
	}
}
