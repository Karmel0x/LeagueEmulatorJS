import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SItemPacket, { type SItemPacketModel } from '../../shared/SItemPacket';

export type BuyItemAnsModel = BasePacketModel & {
	item: SItemPacketModel,
	unknown1: boolean,
	unknown2: boolean,
};

export default class BuyItemAns extends BasePacket {
	static create(payload: Partial<BuyItemAnsModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1 << 0,
		unknown2: 1 << 1,
	};

	static reader(dvr: RelativeDataView, payload: BuyItemAnsModel) {
		super.reader(dvr, payload);

		payload.item = SItemPacket.read(dvr);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;
		payload.unknown2 = bitfield1.unknown2;
	}

	static writer(dvr: RelativeDataView, payload: BuyItemAnsModel) {
		super.writer(dvr, payload);

		SItemPacket.writer(dvr, payload.item);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
			unknown2: payload.unknown2,
		});
	}
}
