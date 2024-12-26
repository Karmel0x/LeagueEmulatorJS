import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type BuffInGroupReplaceModel = {
	ownerNetId: NetId,
	casterNetId: NetId,
	slot: number,
};

export type BuffReplaceGroupModel = BasePacketModel & {
	runningTime: number,
	duration: number,
	entries: BuffInGroupReplaceModel[],
};

export default class BuffReplaceGroup extends BasePacket {
	static create(payload: Partial<BuffReplaceGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffReplaceGroupModel) {
		super.reader(dvr, payload);

		payload.runningTime = dvr.readFloat();
		payload.duration = dvr.readFloat();

		payload.entries = dvr.readArray(() => ({
			ownerNetId: dvr.readUint32(),
			casterNetId: dvr.readUint32(),
			slot: dvr.readUint8(),
		}));
	}

	static writer(dvr: RelativeDataView, payload: BuffReplaceGroupModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.runningTime);
		dvr.writeFloat(payload.duration);

		dvr.writeArray(payload.entries, entry => {
			dvr.writeUint32(entry.ownerNetId);
			dvr.writeUint32(entry.casterNetId);
			dvr.writeUint8(entry.slot);
		});
	}
}