import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

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
