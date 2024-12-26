import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type ChangeMissileSpeedModel = ExtendedPacketModel & {
	speed: number,
	delay: number,
};

export default class ChangeMissileSpeed extends ExtendedPacket {
	static create(payload: Partial<ChangeMissileSpeedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ChangeMissileSpeedModel) {
		super.reader(dvr, payload);

		payload.speed = dvr.readFloat();
		payload.delay = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ChangeMissileSpeedModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.speed);
		dvr.writeFloat(payload.delay);
	}
}
