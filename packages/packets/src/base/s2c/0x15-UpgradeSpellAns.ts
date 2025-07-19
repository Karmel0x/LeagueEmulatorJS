import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UpgradeSpellAnsModel = BasePacketModel & {
	slot: number,
	level: number,
	pointsLeft: number,
};

export default class UpgradeSpellAns extends BasePacket {
	static create(payload: Partial<UpgradeSpellAnsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpgradeSpellAnsModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		payload.level = dvr.readUint8();
		payload.pointsLeft = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UpgradeSpellAnsModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.level);
		dvr.writeUint8(payload.pointsLeft);
	}
}
