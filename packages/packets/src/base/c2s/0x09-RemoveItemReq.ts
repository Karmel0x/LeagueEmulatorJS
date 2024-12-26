import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type RemoveItemReqModel = BasePacketModel & {
	slot: number,
	sell: boolean,
};

export default class RemoveItemReq extends BasePacket {
	static create(payload: Partial<RemoveItemReqModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		sell: 1,
	};

	static reader(dvr: RelativeDataView, payload: RemoveItemReqModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.sell = bitfield1.sell;
	}

	static writer(dvr: RelativeDataView, payload: RemoveItemReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeBitfield(this.bitfield1, {
			sell: payload.sell,
		});
	}
}
