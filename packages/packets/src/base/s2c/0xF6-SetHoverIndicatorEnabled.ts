import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetHoverIndicatorEnabledModel = BasePacketModel & {
	enabled: boolean,
};

export default class SetHoverIndicatorEnabled extends BasePacket {
	static create(payload: Partial<SetHoverIndicatorEnabledModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		enabled: 1,
	};

	static reader(dvr: RelativeDataView, payload: SetHoverIndicatorEnabledModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.enabled = bitfield1.enabled;
	}

	static writer(dvr: RelativeDataView, payload: SetHoverIndicatorEnabledModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			enabled: payload.enabled,
		});
	}
}
