import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ReplaceObjectiveTextModel = BasePacketModel & {
	messageId: string,
};

export default class ReplaceObjectiveText extends BasePacket {
	static create(payload: Partial<ReplaceObjectiveTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ReplaceObjectiveTextModel) {
		super.reader(dvr, payload);

		payload.messageId = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: ReplaceObjectiveTextModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.messageId, 128);
	}
}
