import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type PlayAnimationModel = BasePacketModel & {
	flags: number,
	scaleTime: number,
	startProgress: number,
	speedRatio: number,
	name: string,
};

export default class PlayAnimation extends BasePacket {
	static create(payload: Partial<PlayAnimationModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PlayAnimationModel) {
		super.reader(dvr, payload);

		payload.flags = dvr.readUint8();
		payload.scaleTime = dvr.readFloat();
		payload.startProgress = dvr.readFloat();
		payload.speedRatio = dvr.readFloat();
		payload.name = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: PlayAnimationModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.flags);
		dvr.writeFloat(payload.scaleTime);
		dvr.writeFloat(payload.startProgress);
		dvr.writeFloat(payload.speedRatio);
		dvr.writeStringNullTerminated(payload.name, 64);
	}
}
