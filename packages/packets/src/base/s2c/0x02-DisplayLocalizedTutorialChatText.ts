import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type DisplayLocalizedTutorialChatTextModel = BasePacketModel & {
	message: string,
};

/**
 * orange chat message
 */
export default class DisplayLocalizedTutorialChatText extends BasePacket {
	static create(payload: Partial<DisplayLocalizedTutorialChatTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: DisplayLocalizedTutorialChatTextModel) {
		super.reader(dvr, payload);

		payload.message = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: DisplayLocalizedTutorialChatTextModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.message, 128);
	}
}
