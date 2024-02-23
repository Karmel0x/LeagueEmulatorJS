import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type AI_TargetHeroModel = BasePacketModel & {
	targetNetId: NetId,
};

export default class AI_TargetHero extends BasePacket {
	static create(payload: Partial<AI_TargetHeroModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AI_TargetHeroModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: AI_TargetHeroModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
	}
}
