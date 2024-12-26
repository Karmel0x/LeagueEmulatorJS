import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type UnlockAnimationModel = ExtendedPacketModel & {
	animationName: string,
};

export default class UnlockAnimation extends ExtendedPacket {
	static create(payload: Partial<UnlockAnimationModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnlockAnimationModel) {
		super.reader(dvr, payload);

		payload.animationName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: UnlockAnimationModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.animationName, 64);
	}
}
