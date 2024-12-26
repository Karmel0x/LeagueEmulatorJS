import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { TeamId } from '../../types/team';

export type FadeMinionsModel = BasePacketModel & {
	team: TeamId,
	fadeAmount: number,
	fadeTime: number,
};

export default class FadeMinions extends BasePacket {
	static create(payload: Partial<FadeMinionsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: FadeMinionsModel) {
		super.reader(dvr, payload);

		payload.team = dvr.readUint8();
		payload.fadeAmount = dvr.readFloat();
		payload.fadeTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: FadeMinionsModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.team);
		dvr.writeFloat(payload.fadeAmount);
		dvr.writeFloat(payload.fadeTime);
	}
}
