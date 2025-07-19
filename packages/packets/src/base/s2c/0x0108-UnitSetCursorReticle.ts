import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UnitSetCursorReticleModel = ExtendedPacketModel & {
	radius: number,
	secondaryRadius: number,
};

export default class UnitSetCursorReticle extends ExtendedPacket {
	static create(payload: Partial<UnitSetCursorReticleModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetCursorReticleModel) {
		super.reader(dvr, payload);

		payload.radius = dvr.readFloat();
		payload.secondaryRadius = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetCursorReticleModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.radius);
		dvr.writeFloat(payload.secondaryRadius);
	}
}
