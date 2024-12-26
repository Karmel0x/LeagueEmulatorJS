import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ToggleUIHighlightModel = BasePacketModel & {
	id: number,
	type: number,
	number: number,
	subCategory: number,
	enabled: boolean,
};

export default class ToggleUIHighlight extends BasePacket {
	static create(payload: Partial<ToggleUIHighlightModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		enabled: 1,
	};

	static reader(dvr: RelativeDataView, payload: ToggleUIHighlightModel) {
		super.reader(dvr, payload);

		payload.id = dvr.readUint8();
		payload.type = dvr.readUint8();
		payload.number = dvr.readUint8();
		payload.subCategory = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.enabled = bitfield1.enabled;
	}

	static writer(dvr: RelativeDataView, payload: ToggleUIHighlightModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.id);
		dvr.writeUint8(payload.type);
		dvr.writeUint8(payload.number);
		dvr.writeUint8(payload.subCategory);

		dvr.writeBitfield(this.bitfield1, {
			enabled: payload.enabled,
		});
	}
}