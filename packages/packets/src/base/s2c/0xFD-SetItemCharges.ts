import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetItemChargesModel = BasePacketModel & {
	slot: number,
	charges: number,
};

export default class SetItemCharges extends BasePacket {
	static create(payload: Partial<SetItemChargesModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetItemChargesModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.charges = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: SetItemChargesModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.charges);
	}
}
