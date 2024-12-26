import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type OnReplication_AccModel = BasePacketModel & {
	syncId: number,
};

export default class OnReplication_Acc extends BasePacket {
	static create(payload: Partial<OnReplication_AccModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnReplication_AccModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: OnReplication_AccModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.syncId);
	}
}
