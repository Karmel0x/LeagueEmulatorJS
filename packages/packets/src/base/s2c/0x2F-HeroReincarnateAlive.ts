import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type HeroReincarnateAliveModel = BasePacketModel & {
	position: SVector2Model,
	parValue: number,
};

export default class HeroReincarnateAlive extends BasePacket {
	static create(payload: Partial<HeroReincarnateAliveModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HeroReincarnateAliveModel) {
		super.reader(dvr, payload);

		payload.position = SVector2.read(dvr);
		payload.parValue = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: HeroReincarnateAliveModel) {
		super.writer(dvr, payload);

		SVector2.writer(dvr, payload.position);
		dvr.writeFloat(payload.parValue);
	}
}
