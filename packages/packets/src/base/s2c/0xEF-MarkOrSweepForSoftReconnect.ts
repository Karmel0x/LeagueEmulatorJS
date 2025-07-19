import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export enum MarkOrSweepForSoftReconnectStage {
	markAllUnits = 0x0,
	destroyAllUnits = 0x1,
}

export type MarkOrSweepForSoftReconnectModel = BasePacketModel & {
	unknown1: boolean,
};

export default class MarkOrSweepForSoftReconnect extends BasePacket {
	static create(payload: Partial<MarkOrSweepForSoftReconnectModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: MarkOrSweepForSoftReconnectModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;
	}

	static writer(dvr: RelativeDataView, payload: MarkOrSweepForSoftReconnectModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});
	}
}
