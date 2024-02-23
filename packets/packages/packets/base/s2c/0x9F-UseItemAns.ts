import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type UseItemAnsModel = BasePacketModel & {
	slot: number,
	itemsInSlot: number,
	spellCharges: number,
};

export default class UseItemAns extends BasePacket {
	static create(payload: Partial<UseItemAnsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UseItemAnsModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.itemsInSlot = dvr.readUint8();
		payload.spellCharges = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UseItemAnsModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.itemsInSlot);
		dvr.writeUint8(payload.spellCharges);
	}
}
