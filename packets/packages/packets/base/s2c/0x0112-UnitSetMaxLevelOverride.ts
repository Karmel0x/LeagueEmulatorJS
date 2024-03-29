import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

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
