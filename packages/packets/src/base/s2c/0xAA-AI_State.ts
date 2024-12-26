import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type AI_StateModel = BasePacketModel & {
	aiState: number,
};

export default class AI_State extends BasePacket {
	static create(payload: Partial<AI_StateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AI_StateModel) {
		super.reader(dvr, payload);

		payload.aiState = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: AI_StateModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.aiState);
	}
}
