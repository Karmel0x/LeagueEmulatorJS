import PrimaryPacket, { PrimaryPacketModel } from '@workspace/network/packages/packets/primary-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { PlayerId } from '../types/player';

export type TeamRosterUpdateModel = PrimaryPacketModel & {
	maxOrder: number,
	maxChaos: number,
	teamOrderPlayerIds: PlayerId[],
	teamChaosPlayerIds: PlayerId[],
};

export default class TeamRosterUpdate extends PrimaryPacket {
	static create(payload: Partial<TeamRosterUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: TeamRosterUpdateModel) {
		super.reader(dvr, payload);

		payload.maxOrder = dvr.readUint32();
		payload.maxChaos = dvr.readUint32();

		let playerIds1 = dvr.readArray(() => dvr.readInt64(), 24);
		let playerIds2 = dvr.readArray(() => dvr.readInt64(), 24);

		let count1 = dvr.readUint32();
		let count2 = dvr.readUint32();

		payload.teamOrderPlayerIds = playerIds1.slice(0, count1);
		payload.teamChaosPlayerIds = playerIds2.slice(0, count2);
	}

	static writer(dvr: RelativeDataView, payload: TeamRosterUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.maxOrder);
		dvr.writeUint32(payload.maxChaos);

		dvr.writeArray(payload.teamOrderPlayerIds, v => dvr.writeInt64(v), 24);
		dvr.writeArray(payload.teamChaosPlayerIds, v => dvr.writeInt64(v), 24);

		dvr.writeUint32(payload.teamOrderPlayerIds.length);
		dvr.writeUint32(payload.teamChaosPlayerIds.length);
	}
}
