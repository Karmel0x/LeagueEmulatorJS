import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type StartSpellTargeterModel = ExtendedPacketModel & {
	slot: number,
	targetTime: number,
};

export default class StartSpellTargeter extends ExtendedPacket {
	static create(payload: Partial<StartSpellTargeterModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: StartSpellTargeterModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint32();
		payload.targetTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: StartSpellTargeterModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.slot);
		dvr.writeFloat(payload.targetTime);
	}
}
