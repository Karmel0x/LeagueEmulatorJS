import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type TeamBalanceVoteC2SModel = BasePacketModel & {
	voteYes: boolean,
};

export default class TeamBalanceVoteC2S extends BasePacket {
	static create(payload: Partial<TeamBalanceVoteC2SModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		voteYes: 1,
	};

	static reader(dvr: RelativeDataView, payload: TeamBalanceVoteC2SModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.voteYes = bitfield1.voteYes;
	}

	static writer(dvr: RelativeDataView, payload: TeamBalanceVoteC2SModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			voteYes: payload.voteYes,
		});
	}
}
