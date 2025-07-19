import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetInputLockFlagModel = BasePacketModel & {
	inputLockFlags: number,
	value: boolean,
};

export default class SetInputLockFlag extends BasePacket {
	static create(payload: Partial<SetInputLockFlagModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		value: 1,
	};

	static reader(dvr: RelativeDataView, payload: SetInputLockFlagModel) {
		super.reader(dvr, payload);

		payload.inputLockFlags = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.value = bitfield1.value;
	}

	static writer(dvr: RelativeDataView, payload: SetInputLockFlagModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.inputLockFlags);

		dvr.writeBitfield(this.bitfield1, {
			value: payload.value,
		});
	}
}
