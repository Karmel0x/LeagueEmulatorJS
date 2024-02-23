import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum UIHighlightCommand {
	create = 0x0,
	remove = 0x1,
};

export enum UIElement {
	minimap = 0x0,
	quests = 0x1,
	tips = 0x2,
	characterInfo = 0x3,
	buffs = 0x4,
	ability4 = 0x5,
	recall = 0x6,
	shop = 0x7,
	skillpoint1 = 0x8,
	gold = 0x9,
	assists = 0xa,
	passive = 0xb,
	skillpoint2 = 0xc,
	skillpoint3 = 0xd,
	skillpoint4 = 0xe,
};

export type HandleUIHighlightModel = BasePacketModel & {
	command: UIHighlightCommand,
	element: UIElement,
};

export default class HandleUIHighlight extends BasePacket {
	static create(payload: Partial<HandleUIHighlightModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HandleUIHighlightModel) {
		super.reader(dvr, payload);

		payload.command = dvr.readUint8();
		payload.element = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: HandleUIHighlightModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.command);
		dvr.writeUint8(payload.element);
	}
}
