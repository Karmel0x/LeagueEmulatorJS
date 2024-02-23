import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type TeamSurrenderVoteModel = BasePacketModel & {
	voteYes: boolean,
};

export default class TeamSurrenderVote extends BasePacket {
	static create(payload: Partial<TeamSurrenderVoteModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		voteYes: 1,
	};

	static reader(dvr: RelativeDataView, payload: TeamSurrenderVoteModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.voteYes = bitfield1.voteYes;
	}

	static writer(dvr: RelativeDataView, payload: TeamSurrenderVoteModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			voteYes: payload.voteYes,
		});
	}
}
