import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type UpdateSpellToggleModel = ExtendedPacketModel & {
	slot: number,
	toggleValue: boolean,
};

export default class UpdateSpellToggle extends ExtendedPacket {
	static create(payload: Partial<UpdateSpellToggleModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		toggleValue: 1,
	};

	static reader(dvr: RelativeDataView, payload: UpdateSpellToggleModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readInt32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.toggleValue = bitfield1.toggleValue;
	}

	static writer(dvr: RelativeDataView, payload: UpdateSpellToggleModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.slot);

		dvr.writeBitfield(this.bitfield1, {
			toggleValue: payload.toggleValue,
		});
	}
}
