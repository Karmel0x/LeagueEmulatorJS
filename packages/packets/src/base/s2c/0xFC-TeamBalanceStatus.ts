import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { TeamId } from '../../types/team';

export enum TeamBalanceReason {
	voteWasNo = 0x0,
	notAllowedYet = 0x1,
	notAheadInGold = 0x2,
	notAheadInLevels = 0x3,
	dontSpam = 0x4,
	alreadyVoted = 0x5,
	agreed = 0x6,
};

export type TeamBalanceStatusModel = BasePacketModel & {
	reason: TeamBalanceReason,
	forVote: number,
	againstVote: number,
	team: TeamId,
	goldGranted: number,
	experienceGranted: number,
	towersGranted: number,
};

export default class TeamBalanceStatus extends BasePacket {
	static create(payload: Partial<TeamBalanceStatusModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: TeamBalanceStatusModel) {
		super.reader(dvr, payload);

		payload.reason = dvr.readUint8();
		payload.forVote = dvr.readUint8();
		payload.againstVote = dvr.readUint8();
		payload.team = dvr.readUint32();
		payload.goldGranted = dvr.readFloat();
		payload.experienceGranted = dvr.readInt32();
		payload.towersGranted = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: TeamBalanceStatusModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.reason);
		dvr.writeUint8(payload.forVote);
		dvr.writeUint8(payload.againstVote);
		dvr.writeUint32(payload.team);
		dvr.writeFloat(payload.goldGranted);
		dvr.writeInt32(payload.experienceGranted);
		dvr.writeInt32(payload.towersGranted);
	}
}
