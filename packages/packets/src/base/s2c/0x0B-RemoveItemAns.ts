import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type RemoveItemAnsModel = BasePacketModel & {
	slot: number,
	itemsInSlot: number,
	notifyInventoryChange: boolean,
};

export default class RemoveItemAns extends BasePacket {
	static create(payload: Partial<RemoveItemAnsModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		notifyInventoryChange: 1,
	};

	static reader(dvr: RelativeDataView, payload: RemoveItemAnsModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.itemsInSlot = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.notifyInventoryChange = bitfield1.notifyInventoryChange;
	}

	static writer(dvr: RelativeDataView, payload: RemoveItemAnsModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.itemsInSlot);
		dvr.writeBitfield(this.bitfield1, {
			notifyInventoryChange: payload.notifyInventoryChange,
		});
	}
}
