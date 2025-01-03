import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type RemoveDebugObjectModel = BasePacketModel & {
	id: number,
};

export default class RemoveDebugObject extends BasePacket {
	static create(payload: Partial<RemoveDebugObjectModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RemoveDebugObjectModel) {
		super.reader(dvr, payload);

		payload.id = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: RemoveDebugObjectModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.id);
	}
}
