import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type EndOfGameEventModel = BasePacketModel & {
	teamIsOrder: boolean,
};

export default class EndOfGameEvent extends BasePacket {
	static create(payload: Partial<EndOfGameEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: EndOfGameEventModel) {
		super.reader(dvr, payload);

		payload.teamIsOrder = dvr.readBool();
	}

	static writer(dvr: RelativeDataView, payload: EndOfGameEventModel) {
		super.writer(dvr, payload);

		dvr.writeBool(payload.teamIsOrder);
	}
}
