import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type CancelTargetingReticleModel = BasePacketModel & {
	slot: number,
	resetSpecified: boolean,
};

export default class CancelTargetingReticle extends BasePacket {
	static create(payload: Partial<CancelTargetingReticleModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		resetSpecified: 1,
	};

	static reader(dvr: RelativeDataView, payload: CancelTargetingReticleModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.resetSpecified = bitfield1.resetSpecified;
	}

	static writer(dvr: RelativeDataView, payload: CancelTargetingReticleModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);

		dvr.writeBitfield(this.bitfield1, {
			resetSpecified: payload.resetSpecified,
		});
	}
}
