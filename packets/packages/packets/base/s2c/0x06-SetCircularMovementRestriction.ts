
import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type SetCircularMovementRestrictionModel = BasePacketModel & {
	center: SVector3Model,
	radius: number,
	restrictCamera: boolean,
};

/**
 * restrict movement
 * may be usefull to prevent leaving specific area
 * ex. prevent leaving spawn or new mordekaiser ult
 */
export default class SetCircularMovementRestriction extends BasePacket {
	static create(payload: Partial<SetCircularMovementRestrictionModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		restrictCamera: 1,
	};

	static reader(dvr: RelativeDataView, payload: SetCircularMovementRestrictionModel) {
		super.reader(dvr, payload);

		payload.center = SVector3.read(dvr);
		payload.radius = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.restrictCamera = bitfield1.restrictCamera;
	}

	static writer(dvr: RelativeDataView, payload: SetCircularMovementRestrictionModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.center);
		dvr.writeFloat(payload.radius);

		dvr.writeBitfield(this.bitfield1, {
			restrictCamera: payload.restrictCamera,
		});
	}
}
