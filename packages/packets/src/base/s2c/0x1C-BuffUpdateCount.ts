import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type BuffUpdateCountModel = BasePacketModel & {
	slot: number,
	count: number,
	duration: number,
	runningTime: number,
	casterNetId: NetId,
};

export default class BuffUpdateCount extends BasePacket {
	static create(payload: Partial<BuffUpdateCountModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffUpdateCountModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.count = dvr.readUint8();
		payload.duration = dvr.readFloat();
		payload.runningTime = dvr.readFloat();
		payload.casterNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: BuffUpdateCountModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.count);
		dvr.writeFloat(payload.duration);
		dvr.writeFloat(payload.runningTime);
		dvr.writeUint32(payload.casterNetId);
	}
}