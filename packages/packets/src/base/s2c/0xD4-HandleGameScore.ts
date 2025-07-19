import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { TeamId } from '../../types/team';

export type HandleGameScoreModel = BasePacketModel & {
	team: TeamId,
	score: number,
};

/**
 * Used for dominion game mode
 */
export default class HandleGameScore extends BasePacket {
	static create(payload: Partial<HandleGameScoreModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HandleGameScoreModel) {
		super.reader(dvr, payload);

		payload.team = dvr.readUint32();
		payload.score = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: HandleGameScoreModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.team);
		dvr.writeInt32(payload.score);
	}
}
