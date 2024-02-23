
import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SEvent, { SEventModel } from '../../shared/SEvent';

export type OnEventModel = BasePacketModel & {
	eventData: SEventModel,
};

export default class OnEvent extends BasePacket {
	static create(payload: Partial<OnEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnEventModel) {
		super.reader(dvr, payload);

		payload.eventData = SEvent.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: OnEventModel) {
		super.writer(dvr, payload);

		SEvent.writer(dvr, payload.eventData);
	}
}
