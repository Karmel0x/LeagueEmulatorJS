import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type StartGameModel = BasePacketModel & {
	enablePause: boolean,
};

export default class StartGame extends BasePacket {
	static create(payload: Partial<StartGameModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		enablePause: 1,
	};

	static reader(dvr: RelativeDataView, payload: StartGameModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.enablePause = bitfield1.enablePause;
	}

	static writer(dvr: RelativeDataView, payload: StartGameModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			enablePause: payload.enablePause,
		});
	}
}
