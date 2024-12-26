import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetAutocastModel = BasePacketModel & {
	slot: number,
	critSlot: number,
};

export default class SetAutocast extends BasePacket {
	static create(payload: Partial<SetAutocastModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetAutocastModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readInt8();//readUint8
		payload.critSlot = dvr.readInt8();//readUint8
	}

	static writer(dvr: RelativeDataView, payload: SetAutocastModel) {
		super.writer(dvr, payload);

		dvr.writeInt8(payload.slot);//writeUint8
		dvr.writeInt8(payload.critSlot);//writeUint8
	}
}
