import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SEvent, { SEventModel } from '../../shared/SEvent';

export type OnEventWorldModel = BasePacketModel & {
	eventData: SEventModel,
};

export default class OnEventWorld extends BasePacket {
	static create(payload: Partial<OnEventWorldModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnEventWorldModel) {
		super.reader(dvr, payload);

		payload.eventData = SEvent.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: OnEventWorldModel) {
		super.writer(dvr, payload);

		SEvent.writer(dvr, payload.eventData);
	}
}
