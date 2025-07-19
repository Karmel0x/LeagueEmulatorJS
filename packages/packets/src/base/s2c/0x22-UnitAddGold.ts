import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type UnitAddGoldModel = BasePacketModel & {
	targetNetId: NetId,
	sourceNetId: NetId,
	amount: number,
};

export default class UnitAddGold extends BasePacket {
	static create(payload: Partial<UnitAddGoldModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitAddGoldModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.sourceNetId = dvr.readUint32();
		payload.amount = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UnitAddGoldModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint32(payload.sourceNetId);
		dvr.writeFloat(payload.amount);
	}
}
