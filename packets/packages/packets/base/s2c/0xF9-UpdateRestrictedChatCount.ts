import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type UpdateRestrictedChatCountModel = BasePacketModel & {
	count: number,
};

export default class UpdateRestrictedChatCount extends BasePacket {
	static create(payload: Partial<UpdateRestrictedChatCountModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpdateRestrictedChatCountModel) {
		super.reader(dvr, payload);

		payload.count = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: UpdateRestrictedChatCountModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.count);
	}
}
