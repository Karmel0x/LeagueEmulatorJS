import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type SetFadeOutModel = ExtendedPacketModel & {
	fadeTime: number,
	fadeTargetValue: number,
};

export default class SetFadeOut extends ExtendedPacket {
	static create(payload: Partial<SetFadeOutModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetFadeOutModel) {
		super.reader(dvr, payload);

		payload.fadeTime = dvr.readFloat();
		payload.fadeTargetValue = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SetFadeOutModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.fadeTime);
		dvr.writeFloat(payload.fadeTargetValue);
	}
}
