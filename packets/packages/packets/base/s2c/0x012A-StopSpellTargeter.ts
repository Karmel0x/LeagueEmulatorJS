import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type StopSpellTargeterModel = ExtendedPacketModel & {
	slot: number,
};

export default class StopSpellTargeter extends ExtendedPacket {
	static create(payload: Partial<StopSpellTargeterModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: StopSpellTargeterModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: StopSpellTargeterModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.slot);
	}
}
