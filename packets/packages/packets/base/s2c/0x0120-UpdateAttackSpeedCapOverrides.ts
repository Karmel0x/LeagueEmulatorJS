import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type UpdateAttackSpeedCapOverridesModel = ExtendedPacketModel & {
	overrideMax: boolean,
	overrideMin: boolean,
	maxAttackSpeedOverride: number,
	minAttackSpeedOverride: number,
};

export default class UpdateAttackSpeedCapOverrides extends ExtendedPacket {
	static create(payload: Partial<UpdateAttackSpeedCapOverridesModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		overrideMax: 1,
		overrideMin: 2,
	};

	static reader(dvr: RelativeDataView, payload: UpdateAttackSpeedCapOverridesModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.overrideMax = bitfield1.overrideMax;
		payload.overrideMin = bitfield1.overrideMin;

		payload.maxAttackSpeedOverride = dvr.readFloat();
		payload.minAttackSpeedOverride = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UpdateAttackSpeedCapOverridesModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			overrideMax: payload.overrideMax,
			overrideMin: payload.overrideMin,
		});

		dvr.writeFloat(payload.maxAttackSpeedOverride);
		dvr.writeFloat(payload.minAttackSpeedOverride);
	}
}
