import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type RefreshAuxiliaryTextModel = BasePacketModel & {
	messageId: string,
};

export default class RefreshAuxiliaryText extends BasePacket {
	static create(payload: Partial<RefreshAuxiliaryTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RefreshAuxiliaryTextModel) {
		super.reader(dvr, payload);

		payload.messageId = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: RefreshAuxiliaryTextModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.messageId, 128);
	}
}
