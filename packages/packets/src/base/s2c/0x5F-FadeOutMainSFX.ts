import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type FadeOutMainSFXModel = BasePacketModel & {
	fadeTime: number,
};

export default class FadeOutMainSFX extends BasePacket {
	static create(payload: Partial<FadeOutMainSFXModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: FadeOutMainSFXModel) {
		super.reader(dvr, payload);

		payload.fadeTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: FadeOutMainSFXModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.fadeTime);
	}
}
