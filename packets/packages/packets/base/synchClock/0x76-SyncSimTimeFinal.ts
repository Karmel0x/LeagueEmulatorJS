import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SyncSimTimeFinalModel = BasePacketModel & {
	timeLastClient: number,
	timeRTTLastOverhead: number,
	timeConvergance: number,
};

export default class SyncSimTimeFinal extends BasePacket {
	static create(payload: Partial<SyncSimTimeFinalModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SyncSimTimeFinalModel) {
		super.reader(dvr, payload);

		payload.timeLastClient = dvr.readFloat();
		payload.timeRTTLastOverhead = dvr.readFloat();
		payload.timeConvergance = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SyncSimTimeFinalModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.timeLastClient);
		dvr.writeFloat(payload.timeRTTLastOverhead);
		dvr.writeFloat(payload.timeConvergance);
	}
}
