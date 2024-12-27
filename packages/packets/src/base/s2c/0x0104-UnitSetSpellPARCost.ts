import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export enum PARCostType {
	flat = 0,
	mult = 1,
};

export type UnitSetSpellPARCostModel = ExtendedPacketModel & {
	costType: PARCostType,
	slot: number,
	amount: number,
};

export default class UnitSetSpellPARCost extends ExtendedPacket {
	static create(payload: Partial<UnitSetSpellPARCostModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetSpellPARCostModel) {
		super.reader(dvr, payload);

		payload.costType = dvr.readUint8();
		payload.slot = dvr.readInt32();
		payload.amount = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetSpellPARCostModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.costType);
		dvr.writeInt32(payload.slot);
		dvr.writeFloat(payload.amount);
	}
}
