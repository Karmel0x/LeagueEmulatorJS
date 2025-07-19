import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetFrequencyModel = BasePacketModel & {
	newFrequency: number,
};

/**
 * setting speed of the game
 * may be used to fast forward game
 */
export default class SetFrequency extends BasePacket {
	static create(payload: Partial<SetFrequencyModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetFrequencyModel) {
		super.reader(dvr, payload);

		payload.newFrequency = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SetFrequencyModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.newFrequency);
	}
}
