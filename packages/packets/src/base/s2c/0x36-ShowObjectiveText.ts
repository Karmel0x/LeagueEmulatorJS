import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ShowObjectiveTextModel = BasePacketModel & {
	messageId: string,
};

/**
 * text in border on middle of the screen
 * to hide it use HideObjectiveText
 */
export default class ShowObjectiveText extends BasePacket {
	static create(payload: Partial<ShowObjectiveTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ShowObjectiveTextModel) {
		super.reader(dvr, payload);

		payload.messageId = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: ShowObjectiveTextModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.messageId, 128);
	}
}
