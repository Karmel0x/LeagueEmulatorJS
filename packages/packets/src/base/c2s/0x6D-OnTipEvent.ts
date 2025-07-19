import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type OnTipEventModel = BasePacketModel & {
	command: number,
	id: number,
};

export default class OnTipEvent extends BasePacket {
	static create(payload: Partial<OnTipEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnTipEventModel) {
		super.reader(dvr, payload);

		payload.command = dvr.readUint8();// event
		payload.id = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: OnTipEventModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.command);
		dvr.writeUint32(payload.id);
	}
}
