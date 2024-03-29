import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

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
