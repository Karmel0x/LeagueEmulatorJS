import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { TeamId } from '../../types/team';

export enum TeamSurrenderReason {
	voteWasNo = 0x0,
	notAllowedYet = 0x1,
	dontSpam = 0x4,
	alreadyVoted = 0x5,
	agreed = 0x6,
};

export type TeamSurrenderStatusModel = BasePacketModel & {
	reason: TeamSurrenderReason,
	forVote: number,
	againstVote: number,
	team: TeamId,
};

export default class TeamSurrenderStatus extends BasePacket {
	static create(payload: Partial<TeamSurrenderStatusModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: TeamSurrenderStatusModel) {
		super.reader(dvr, payload);

		payload.reason = dvr.readUint32();
		payload.forVote = dvr.readUint8();
		payload.againstVote = dvr.readUint8();
		payload.team = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: TeamSurrenderStatusModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.reason);
		dvr.writeUint8(payload.forVote);
		dvr.writeUint8(payload.againstVote);
		dvr.writeUint32(payload.team);
	}
}
