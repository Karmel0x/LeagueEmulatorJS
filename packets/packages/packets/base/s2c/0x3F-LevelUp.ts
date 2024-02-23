import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type LevelUpModel = BasePacketModel & {
	level: number,
	availablePoints: number,
};

export default class LevelUp extends BasePacket {
	static create(payload: Partial<LevelUpModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: LevelUpModel) {
		super.reader(dvr, payload);

		payload.level = dvr.readUint8();
		payload.availablePoints = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: LevelUpModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.level);
		dvr.writeUint8(payload.availablePoints);
	}
}
