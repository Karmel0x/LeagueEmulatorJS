import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type BuffUpdateNumCounterModel = ExtendedPacketModel & {
	buffSlot: number,
	counter: number,
};

export default class BuffUpdateNumCounter extends ExtendedPacket {
	static create(payload: Partial<BuffUpdateNumCounterModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffUpdateNumCounterModel) {
		super.reader(dvr, payload);

		payload.buffSlot = dvr.readUint8();
		payload.counter = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: BuffUpdateNumCounterModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.buffSlot);
		dvr.writeInt32(payload.counter);
	}
}
