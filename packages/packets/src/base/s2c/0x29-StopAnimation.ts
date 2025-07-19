import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type StopAnimationModel = BasePacketModel & {
	fade: boolean,
	ignoreLock: boolean,
	stopAll: boolean,
	animationName: string,
};

export default class StopAnimation extends BasePacket {
	static create(payload: Partial<StopAnimationModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		fade: 1 << 0,
		ignoreLock: 1 << 1,
		stopAll: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: StopAnimationModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.fade = bitfield1.fade;
		payload.ignoreLock = bitfield1.ignoreLock;
		payload.stopAll = bitfield1.stopAll;

		payload.animationName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: StopAnimationModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			fade: payload.fade,
			ignoreLock: payload.ignoreLock,
			stopAll: payload.stopAll,
		});

		dvr.writeStringNullTerminated(payload.animationName, 64);
	}
}
