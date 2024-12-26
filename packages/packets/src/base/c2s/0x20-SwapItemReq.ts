import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SwapItemReqModel = BasePacketModel & {
	source: number,
	destination: number,
};

export default class SwapItemReq extends BasePacket {
	static create(payload: Partial<SwapItemReqModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SwapItemReqModel) {
		super.reader(dvr, payload);

		payload.source = dvr.readUint8();
		payload.destination = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: SwapItemReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.source);
		dvr.writeUint8(payload.destination);
	}
}
