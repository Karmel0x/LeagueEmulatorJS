import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type ModifyShieldModel = BasePacketModel & {
	physical: boolean,
	magical: boolean,
	stopShieldFade: boolean,
	amount: number,
};

export default class ModifyShield extends BasePacket {
	static create(payload: Partial<ModifyShieldModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		physical: 1 << 0,
		magical: 1 << 1,
		stopShieldFade: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: ModifyShieldModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.physical = bitfield1.physical;
		payload.magical = bitfield1.magical;
		payload.stopShieldFade = bitfield1.stopShieldFade;

		payload.amount = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ModifyShieldModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			physical: payload.physical,
			magical: payload.magical,
			stopShieldFade: payload.stopShieldFade,
		});

		dvr.writeFloat(payload.amount);
	}
}
