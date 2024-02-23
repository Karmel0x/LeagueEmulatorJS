import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type BuffUpdateCountGroupEntryModel = {
	ownerNetId: NetId,
	casterNetId: NetId,
	slot: number,
	count: number,
};

export type BuffUpdateCountGroupModel = BasePacketModel & {
	duration: number,
	runningTime: number,
	entries: BuffUpdateCountGroupEntryModel[],
};

export default class BuffUpdateCountGroup extends BasePacket {
	static create(payload: Partial<BuffUpdateCountGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffUpdateCountGroupModel) {
		super.reader(dvr, payload);

		payload.duration = dvr.readFloat();
		payload.runningTime = dvr.readFloat();

		let count = dvr.readUint8();
		payload.entries = dvr.readArray(() => ({
			ownerNetId: dvr.readUint32(),
			casterNetId: dvr.readUint32(),
			slot: dvr.readUint8(),
			count: dvr.readUint8(),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: BuffUpdateCountGroupModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.duration);
		dvr.writeFloat(payload.runningTime);

		let count = payload.entries.length;
		dvr.writeUint8(count);

		payload.entries.forEach(entry => {
			dvr.writeUint32(entry.ownerNetId);
			dvr.writeUint32(entry.casterNetId);
			dvr.writeUint8(entry.slot);
			dvr.writeUint8(entry.count);
		});
	}
}
