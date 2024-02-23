import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SetFadeOut_PushModel = BasePacketModel & {
	fadeId: number,
	fadeTime: number,
	fadeTargetValue: number,
};

export default class SetFadeOut_Push extends BasePacket {
	static create(payload: Partial<SetFadeOut_PushModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetFadeOut_PushModel) {
		super.reader(dvr, payload);

		payload.fadeId = dvr.readInt16();
		payload.fadeTime = dvr.readFloat();
		payload.fadeTargetValue = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SetFadeOut_PushModel) {
		super.writer(dvr, payload);

		dvr.writeInt16(payload.fadeId);
		dvr.writeFloat(payload.fadeTime);
		dvr.writeFloat(payload.fadeTargetValue);
	}
}
