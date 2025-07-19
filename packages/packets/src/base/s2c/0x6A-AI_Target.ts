import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type AI_TargetModel = BasePacketModel & {
	targetNetId: NetId,
};

export default class AI_Target extends BasePacket {
	static create(payload: Partial<AI_TargetModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AI_TargetModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: AI_TargetModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
	}
}
