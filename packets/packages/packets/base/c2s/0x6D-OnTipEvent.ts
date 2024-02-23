import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

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

		payload.command = dvr.readUint8();
		payload.id = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: OnTipEventModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.command);
		dvr.writeUint32(payload.id);
	}
}
