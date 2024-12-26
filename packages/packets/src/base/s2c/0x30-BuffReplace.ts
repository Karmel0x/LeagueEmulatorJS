import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type BuffReplaceModel = BasePacketModel & {
	slot: number,
	runningTime: number,
	duration: number,
	casterNetId: NetId,
};

export default class BuffReplace extends BasePacket {
	static create(payload: Partial<BuffReplaceModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffReplaceModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.runningTime = dvr.readFloat();
		payload.duration = dvr.readFloat();
		payload.casterNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BuffReplaceModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeFloat(payload.runningTime);
		dvr.writeFloat(payload.duration);
		dvr.writeUint32(payload.casterNetId);
	}
}
