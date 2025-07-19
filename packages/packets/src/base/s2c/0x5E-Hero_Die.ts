import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SDeathData, { type SDeathDataModel } from '../../shared/SDeathData';

export type Hero_DieModel = BasePacketModel & SDeathDataModel;

export default class Hero_Die extends BasePacket {
	static create(payload: Partial<Hero_DieModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Hero_DieModel) {
		super.reader(dvr, payload);

		SDeathData.reader(dvr, payload);
	}

	static writer(dvr: RelativeDataView, payload: Hero_DieModel) {
		super.writer(dvr, payload);

		SDeathData.writer(dvr, payload);
	}
}
