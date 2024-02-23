import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type OpenTutorialPopupModel = BasePacketModel & {
	messageBoxId: string,
};

export default class OpenTutorialPopup extends BasePacket {
	static create(payload: Partial<OpenTutorialPopupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OpenTutorialPopupModel) {
		super.reader(dvr, payload);

		payload.messageBoxId = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: OpenTutorialPopupModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.messageBoxId, 128);
	}
}
