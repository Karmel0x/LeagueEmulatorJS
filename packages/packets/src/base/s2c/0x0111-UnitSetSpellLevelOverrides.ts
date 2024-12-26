import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type UnitSetSpellLevelOverridesModel = ExtendedPacketModel & {
	spellMaxLevels: number[],
	spellUpgradeLevels: number[][],
};

export default class UnitSetSpellLevelOverrides extends ExtendedPacket {
	static create(payload: Partial<UnitSetSpellLevelOverridesModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetSpellLevelOverridesModel) {
		super.reader(dvr, payload);

		payload.spellMaxLevels = dvr.readArray(() => dvr.readUint8(), 4);
		payload.spellUpgradeLevels = dvr.readArray(() => dvr.readArray(() => dvr.readUint8(), 6), 4);
	}

	static writer(dvr: RelativeDataView, payload: UnitSetSpellLevelOverridesModel) {
		super.writer(dvr, payload);

		dvr.writeArray(payload.spellMaxLevels, (value) => dvr.writeUint8(value), 4);
		dvr.writeArray(payload.spellUpgradeLevels, (value) => dvr.writeArray(value, (value) => dvr.writeUint8(value), 6), 4);
	}
}
