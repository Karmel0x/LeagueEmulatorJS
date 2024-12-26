import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type BuffRemove2Model = BasePacketModel & {
	slot: number,
	nameHash: number,
	runTimeRemove: number,
};

export default class BuffRemove2 extends BasePacket {
	static create(payload: Partial<BuffRemove2Model>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffRemove2Model) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.nameHash = dvr.readUint32();
		payload.runTimeRemove = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: BuffRemove2Model) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint32(payload.nameHash);
		dvr.writeFloat(payload.runTimeRemove);
	}
}
