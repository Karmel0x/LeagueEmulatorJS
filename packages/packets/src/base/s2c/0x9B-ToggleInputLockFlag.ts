import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ToggleInputLockFlagModel = BasePacketModel & {
	inputLockFlags: number,
};

export default class ToggleInputLockFlag extends BasePacket {
	static create(payload: Partial<ToggleInputLockFlagModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ToggleInputLockFlagModel) {
		super.reader(dvr, payload);

		payload.inputLockFlags = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ToggleInputLockFlagModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.inputLockFlags);
	}
}
