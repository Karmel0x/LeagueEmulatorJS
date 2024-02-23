import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SetSpellLevelModel = BasePacketModel & {
	slot: number,
	level: number,
};

export default class SetSpellLevel extends BasePacket {
	static create(payload: Partial<SetSpellLevelModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetSpellLevelModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readInt32();
		payload.level = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: SetSpellLevelModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.slot);
		dvr.writeInt32(payload.level);
	}
}
