import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type EndGameModel = BasePacketModel & {
	isTeamOrderWin: boolean,
};

export default class EndGame extends BasePacket {
	static create(payload: Partial<EndGameModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isTeamOrderWin: 1,
	};

	static reader(dvr: RelativeDataView, payload: EndGameModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isTeamOrderWin = bitfield1.isTeamOrderWin;
	}

	static writer(dvr: RelativeDataView, payload: EndGameModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			isTeamOrderWin: payload.isTeamOrderWin,
		});
	}
}
