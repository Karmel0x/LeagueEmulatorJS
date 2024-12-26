import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetShopEnabledModel = BasePacketModel & {
	enabled: boolean,
	forceEnabled: boolean,
};

export default class SetShopEnabled extends BasePacket {
	static create(payload: Partial<SetShopEnabledModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		enabled: 1,
		forceEnabled: 2,
	};

	static reader(dvr: RelativeDataView, payload: SetShopEnabledModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.enabled = bitfield1.enabled;
		payload.forceEnabled = bitfield1.forceEnabled;
	}

	static writer(dvr: RelativeDataView, payload: SetShopEnabledModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			enabled: payload.enabled,
			forceEnabled: payload.forceEnabled,
		});
	}
}
