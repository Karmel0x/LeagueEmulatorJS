import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetFadeOut_PopModel = BasePacketModel & {
	stackId: number,
};

export default class SetFadeOut_Pop extends BasePacket {
	static create(payload: Partial<SetFadeOut_PopModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetFadeOut_PopModel) {
		super.reader(dvr, payload);

		payload.stackId = dvr.readInt16();
	}

	static writer(dvr: RelativeDataView, payload: SetFadeOut_PopModel) {
		super.writer(dvr, payload);

		dvr.writeInt16(payload.stackId);
	}
}
