
import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SEvent, { SEventModel } from '../../shared/SEvent';
import type { NetId } from '../../types/player';

export type EventHistoryEntryModel = {
	timestamp: number,
	count: number,
	eventData: SEventModel,
};

export type Die_EventHistoryModel = BasePacketModel & {
	eventSourceType: number,
	killerNetId: NetId,
	duration: number,
	entries: EventHistoryEntryModel[],
};

export default class Die_EventHistory extends BasePacket {
	static create(payload: Partial<Die_EventHistoryModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Die_EventHistoryModel) {
		super.reader(dvr, payload);

		payload.eventSourceType = dvr.readUint8();
		payload.killerNetId = dvr.readUint32();
		payload.duration = dvr.readFloat();

		let count = dvr.readInt32();
		payload.entries = dvr.readArray(() => ({
			timestamp: dvr.readFloat(),
			count: dvr.readUint16(),
			eventData: SEvent.read(dvr),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: Die_EventHistoryModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.eventSourceType);
		dvr.writeUint32(payload.killerNetId);
		dvr.writeFloat(payload.duration);

		payload.entries = payload.entries || [];
		dvr.writeInt32(payload.entries.length);
		payload.entries.forEach(entry => {
			dvr.writeFloat(entry.timestamp);
			dvr.writeUint16(entry.count);
			SEvent.writer(dvr, entry.eventData);
		});
	}
}
