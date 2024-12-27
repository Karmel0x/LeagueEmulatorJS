import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UnitSetMaxLevelOverrideModel = ExtendedPacketModel & {
	maxLevelOverride: number,
};

export default class UnitSetMaxLevelOverride extends ExtendedPacket {
	static create(payload: Partial<UnitSetMaxLevelOverrideModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetMaxLevelOverrideModel) {
		super.reader(dvr, payload);

		payload.maxLevelOverride = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetMaxLevelOverrideModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.maxLevelOverride);
	}
}
