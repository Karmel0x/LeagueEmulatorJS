import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ModifyDebugTextModel = BasePacketModel & {
	text: string,
};

export default class ModifyDebugText extends BasePacket {
	static create(payload: Partial<ModifyDebugTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ModifyDebugTextModel) {
		super.reader(dvr, payload);

		payload.text = dvr.readString();

		//payload.id = dvr.readInt32();
		//payload.text = dvr.readCharArray(128);
		//
		//let bitfield1 = dvr.readBitfield(this.bitfield1);
		//payload.unknown1 = bitfield1.unknown1;
	}

	static writer(dvr: RelativeDataView, payload: ModifyDebugTextModel) {
		super.writer(dvr, payload);

		dvr.writeString(payload.text);
	}
}
