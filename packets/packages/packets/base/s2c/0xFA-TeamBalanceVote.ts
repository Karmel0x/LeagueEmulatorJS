import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type TeamBalanceVoteModel = BasePacketModel & {
	voteYes: boolean,
	openVoteMenu: boolean,
	playerNetId: NetId,
	forVote: number,
	againstVote: number,
	numPlayers: number,
	team: TeamId,
	timeout: number,
	goldGranted: number,
	experienceGranted: number,
	towersGranted: number,
};

export default class TeamBalanceVote extends BasePacket {
	static create(payload: Partial<TeamBalanceVoteModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		voteYes: 1,
		openVoteMenu: 2,
	};

	static reader(dvr: RelativeDataView, payload: TeamBalanceVoteModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.voteYes = bitfield1.voteYes;
		payload.openVoteMenu = bitfield1.openVoteMenu;

		payload.playerNetId = dvr.readUint32();
		payload.forVote = dvr.readUint8();
		payload.againstVote = dvr.readUint8();
		payload.numPlayers = dvr.readUint8();
		payload.team = dvr.readUint32();
		payload.timeout = dvr.readFloat();
		payload.goldGranted = dvr.readFloat();
		payload.experienceGranted = dvr.readInt32();
		payload.towersGranted = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: TeamBalanceVoteModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			voteYes: payload.voteYes,
			openVoteMenu: payload.openVoteMenu,
		});

		dvr.writeUint32(payload.playerNetId);
		dvr.writeUint8(payload.forVote);
		dvr.writeUint8(payload.againstVote);
		dvr.writeUint8(payload.numPlayers);
		dvr.writeUint32(payload.team);
		dvr.writeFloat(payload.timeout);
		dvr.writeFloat(payload.goldGranted);
		dvr.writeInt32(payload.experienceGranted);
		dvr.writeInt32(payload.towersGranted);
	}
}
