import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UpdateDeathTimerModel = ExtendedPacketModel & {
	deathDuration: number,
};

export default class UpdateDeathTimer extends ExtendedPacket {
	static create(payload: Partial<UpdateDeathTimerModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpdateDeathTimerModel) {
		super.reader(dvr, payload);

		payload.deathDuration = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UpdateDeathTimerModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.deathDuration);
	}
}
