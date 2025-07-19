import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';

export type MoveCameraToPointModel = BasePacketModel & {
	flags: {
		startFromCurrentPosition: boolean,
		unlockCamera: boolean,
	},
	startPosition: SVector3Model,
	targetPosition: SVector3Model,
	travelTime: number,
};

export default class MoveCameraToPoint extends BasePacket {
	static create(payload: Partial<MoveCameraToPointModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		startFromCurrentPosition: 1,
		unlockCamera: 2,
	};

	static reader(dvr: RelativeDataView, payload: MoveCameraToPointModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.flags = {
			startFromCurrentPosition: bitfield1.startFromCurrentPosition,
			unlockCamera: bitfield1.unlockCamera,
		};

		payload.startPosition = SVector3.read(dvr);
		payload.targetPosition = SVector3.read(dvr);
		payload.travelTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: MoveCameraToPointModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, payload.flags);

		SVector3.writer(dvr, payload.startPosition);
		SVector3.writer(dvr, payload.targetPosition);
		dvr.writeFloat(payload.travelTime);
	}
}
