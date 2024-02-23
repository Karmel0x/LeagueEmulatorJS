import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type AnimationUpdateTimeStepModel = ExtendedPacketModel & {
	updateTimeStep: number,
	animationName: string,
};

export default class AnimationUpdateTimeStep extends ExtendedPacket {
	static create(payload: Partial<AnimationUpdateTimeStepModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AnimationUpdateTimeStepModel) {
		super.reader(dvr, payload);

		payload.updateTimeStep = dvr.readFloat();
		payload.animationName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: AnimationUpdateTimeStepModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.updateTimeStep);
		dvr.writeStringNullTerminated(payload.animationName, 64);
	}
}
