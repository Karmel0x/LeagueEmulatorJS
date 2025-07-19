import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ModifyDebugObjectColorModel = BasePacketModel & {
	objectId: number,
	color: number,
};

export default class ModifyDebugObjectColor extends BasePacket {
	static create(payload: Partial<ModifyDebugObjectColorModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ModifyDebugObjectColorModel) {
		super.reader(dvr, payload);

		payload.objectId = dvr.readInt32();
		payload.color = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ModifyDebugObjectColorModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.objectId);
		dvr.writeUint32(payload.color);
	}
}
