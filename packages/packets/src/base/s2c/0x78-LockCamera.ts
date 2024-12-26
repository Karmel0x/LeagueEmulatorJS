import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type LockCameraModel = BasePacketModel & {
	lock: boolean,
};

export default class LockCamera extends BasePacket {
	static create(payload: Partial<LockCameraModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		lock: 1,
	};

	static reader(dvr: RelativeDataView, payload: LockCameraModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.lock = bitfield1.lock;
	}

	static writer(dvr: RelativeDataView, payload: LockCameraModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			lock: payload.lock,
		});
	}
}
