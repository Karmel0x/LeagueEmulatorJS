import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type UnitChangeTeamModel = BasePacketModel & {
	unitNetId: NetId,
	team: TeamId,
};

export default class UnitChangeTeam extends BasePacket {
	static create(payload: Partial<UnitChangeTeamModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitChangeTeamModel) {
		super.reader(dvr, payload);

		payload.unitNetId = dvr.readUint32();
		payload.team = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: UnitChangeTeamModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.unitNetId);
		dvr.writeUint32(payload.team);
	}
}
