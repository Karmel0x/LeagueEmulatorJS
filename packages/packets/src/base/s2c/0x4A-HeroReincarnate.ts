import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { type SVector2Model } from '../../shared/SVector2';

export type HeroReincarnateModel = BasePacketModel & {
	position: SVector2Model,
	parValue: number,
};

export default class HeroReincarnate extends BasePacket {
	static create(payload: Partial<HeroReincarnateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HeroReincarnateModel) {
		super.reader(dvr, payload);

		payload.position = SVector2.read(dvr);
		payload.parValue = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: HeroReincarnateModel) {
		super.writer(dvr, payload);

		SVector2.writer(dvr, payload.position);
		dvr.writeFloat(payload.parValue);
	}
}
