import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type FX_OnEnterTeamVisibilityModel = BasePacketModel & {
	objectNetId: number,
	visibilityTeam: number,
};

export default class FX_OnEnterTeamVisibility extends BasePacket {
	static create(payload: Partial<FX_OnEnterTeamVisibilityModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: FX_OnEnterTeamVisibilityModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.visibilityTeam = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: FX_OnEnterTeamVisibilityModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.visibilityTeam);
	}
}
