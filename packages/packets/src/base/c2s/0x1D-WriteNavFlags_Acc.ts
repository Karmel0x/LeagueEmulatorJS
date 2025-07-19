import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type WriteNavFlags_AccModel = BasePacketModel & {
	syncId: number,
};

export default class WriteNavFlags_Acc extends BasePacket {
	static create(payload: Partial<WriteNavFlags_AccModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WriteNavFlags_AccModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: WriteNavFlags_AccModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);
	}
}
