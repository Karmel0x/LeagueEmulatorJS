import PrimaryPacket, { PrimaryPacketModel } from '@workspace/network/packages/packets/primary-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { ClientId } from '../types/player';
import type { TeamId } from '../types/team';

export type RequestJoinTeamModel = PrimaryPacketModel & {
	clientId: ClientId,
	team: TeamId,
};

export default class RequestJoinTeam extends PrimaryPacket {
	static create(payload: Partial<RequestJoinTeamModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RequestJoinTeamModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
		payload.team = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: RequestJoinTeamModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
		dvr.writeUint32(payload.team);
	}
}
