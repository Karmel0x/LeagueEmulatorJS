import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ShowAuxiliaryTextModel = BasePacketModel & {
	messageId: string,
};

export default class ShowAuxiliaryText extends BasePacket {
	static create(payload: Partial<ShowAuxiliaryTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ShowAuxiliaryTextModel) {
		super.reader(dvr, payload);

		payload.messageId = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: ShowAuxiliaryTextModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.messageId, 128);
	}
}
