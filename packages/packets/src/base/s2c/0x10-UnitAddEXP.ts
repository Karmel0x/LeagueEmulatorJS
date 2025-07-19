import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type UnitAddEXPModel = BasePacketModel & {
	targetNetId: NetId,
	amount: number,
};

export default class UnitAddEXP extends BasePacket {
	static create(payload: Partial<UnitAddEXPModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitAddEXPModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.amount = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UnitAddEXPModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		dvr.writeFloat(payload.amount);
	}
}
