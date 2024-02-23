import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type BuyItemReqModel = BasePacketModel & {
	itemId: number,
};

export default class BuyItemReq extends BasePacket {
	static create(payload: Partial<BuyItemReqModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuyItemReqModel) {
		super.reader(dvr, payload);

		payload.itemId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BuyItemReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.itemId);
	}
}
