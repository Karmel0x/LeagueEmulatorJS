import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SDeathData, { type SDeathDataModel } from '../../shared/SDeathData';

export type Die_MapViewModel = ExtendedPacketModel & {
	deathData: SDeathDataModel,
};

export default class Die_MapView extends ExtendedPacket {
	static create(payload: Partial<Die_MapViewModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Die_MapViewModel) {
		super.reader(dvr, payload);

		payload.deathData = SDeathData.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: Die_MapViewModel) {
		super.writer(dvr, payload);

		SDeathData.writer(dvr, payload.deathData);
	}
}
