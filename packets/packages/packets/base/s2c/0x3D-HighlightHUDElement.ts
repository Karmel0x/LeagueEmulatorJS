import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum HUDPart {
	generic = 0x0,
	shop = 0x1,
	titanBar = 0x2,
};

export type HighlightHUDElementModel = BasePacketModel & {
	part: HUDPart,
	type: number,
	number: number,
	subCategory: number,
};

export default class HighlightHUDElement extends BasePacket {
	static create(payload: Partial<HighlightHUDElementModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HighlightHUDElementModel) {
		super.reader(dvr, payload);

		payload.part = dvr.readUint8();
		payload.type = dvr.readUint8();
		payload.number = dvr.readUint8();
		payload.subCategory = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: HighlightHUDElementModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.part);
		dvr.writeUint8(payload.type);
		dvr.writeUint8(payload.number);
		dvr.writeUint8(payload.subCategory);
	}
}
