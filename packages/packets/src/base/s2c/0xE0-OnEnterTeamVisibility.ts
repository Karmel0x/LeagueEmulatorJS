import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type OnEnterTeamVisibilityModel = BasePacketModel & {
	visibilityTeam: number,
};

export default class OnEnterTeamVisibility extends BasePacket {
	static create(payload: Partial<OnEnterTeamVisibilityModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnEnterTeamVisibilityModel) {
		super.reader(dvr, payload);

		payload.visibilityTeam = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: OnEnterTeamVisibilityModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.visibilityTeam);
	}
}
