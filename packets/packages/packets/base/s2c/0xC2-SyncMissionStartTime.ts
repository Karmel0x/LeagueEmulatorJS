import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SyncMissionStartTimeModel = BasePacketModel & {
	time: number,
};

export default class SyncMissionStartTime extends BasePacket {
	static create(payload: Partial<SyncMissionStartTimeModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SyncMissionStartTimeModel) {
		super.reader(dvr, payload);

		payload.time = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SyncMissionStartTimeModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.time);
	}
}
