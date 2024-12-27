import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UnitSetPARTypeModel = ExtendedPacketModel & {
	parType: number,
};

export default class UnitSetPARType extends ExtendedPacket {
	static create(payload: Partial<UnitSetPARTypeModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetPARTypeModel) {
		super.reader(dvr, payload);

		payload.parType = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetPARTypeModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.parType);
	}
}
