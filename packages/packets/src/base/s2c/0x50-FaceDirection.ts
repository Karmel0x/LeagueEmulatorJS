import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';

export type FaceDirectionModel = BasePacketModel & {
	direction: SVector3Model,
	doLerpTime: boolean,
	lerpTime: number,
};

export default class FaceDirection extends BasePacket {
	static create(payload: Partial<FaceDirectionModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		doLerpTime: 1,
	};

	static reader(dvr: RelativeDataView, payload: FaceDirectionModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.doLerpTime = bitfield1.doLerpTime;

		payload.direction = SVector3.read(dvr);
		payload.lerpTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: FaceDirectionModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			doLerpTime: payload.doLerpTime,
		});

		SVector3.writer(dvr, payload.direction);
		dvr.writeFloat(payload.lerpTime);
	}
}
