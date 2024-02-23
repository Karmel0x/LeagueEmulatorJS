import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type ReplayOnly_GoldEarnedModel = BasePacketModel & {
	owneNetId: NetId,
	amount: number,
};

export default class ReplayOnly_GoldEarned extends BasePacket {
	static create(payload: Partial<ReplayOnly_GoldEarnedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ReplayOnly_GoldEarnedModel) {
		super.reader(dvr, payload);

		payload.owneNetId = dvr.readUint32();
		payload.amount = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ReplayOnly_GoldEarnedModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.owneNetId);
		dvr.writeFloat(payload.amount);
	}
}
