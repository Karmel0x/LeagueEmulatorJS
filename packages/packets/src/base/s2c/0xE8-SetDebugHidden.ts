import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetDebugHiddenModel = BasePacketModel & {
	id: number,
	unknown1: boolean,
};

export default class SetDebugHidden extends BasePacket {
	static create(payload: Partial<SetDebugHiddenModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: SetDebugHiddenModel) {
		super.reader(dvr, payload);

		payload.id = dvr.readInt32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;
	}

	static writer(dvr: RelativeDataView, payload: SetDebugHiddenModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.id);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});
	}
}
