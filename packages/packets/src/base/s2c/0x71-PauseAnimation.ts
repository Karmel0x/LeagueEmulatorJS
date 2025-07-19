import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type PauseAnimationModel = BasePacketModel & {
	pause: boolean,
};

export default class PauseAnimation extends BasePacket {
	static create(payload: Partial<PauseAnimationModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		pause: 1,
	};

	static reader(dvr: RelativeDataView, payload: PauseAnimationModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.pause = bitfield1.pause;
	}

	static writer(dvr: RelativeDataView, payload: PauseAnimationModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			pause: payload.pause,
		});
	}
}
