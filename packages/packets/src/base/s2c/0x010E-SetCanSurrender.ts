import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetCanSurrenderModel = ExtendedPacketModel & {
	canSurrender: boolean,
};

export default class SetCanSurrender extends ExtendedPacket {
	static create(payload: Partial<SetCanSurrenderModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		canSurrender: 1,
	};

	static reader(dvr: RelativeDataView, payload: SetCanSurrenderModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.canSurrender = bitfield1.canSurrender;
	}

	static writer(dvr: RelativeDataView, payload: SetCanSurrenderModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			canSurrender: payload.canSurrender,
		});
	}
}
