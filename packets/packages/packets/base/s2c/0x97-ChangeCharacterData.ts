import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ChangeCharacterDataModel = BasePacketModel & {
	overrideSpells: boolean,
	modelOnly: boolean,
	replaceCharacterPackage: boolean,
	id: number,
	skinId: number,
	skinName: string,
};

export default class ChangeCharacterData extends BasePacket {
	static create(payload: Partial<ChangeCharacterDataModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		overrideSpells: 1 << 0,
		modelOnly: 1 << 1,
		replaceCharacterPackage: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: ChangeCharacterDataModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.overrideSpells = bitfield1.overrideSpells;
		payload.modelOnly = bitfield1.modelOnly;
		payload.replaceCharacterPackage = bitfield1.replaceCharacterPackage;

		payload.id = dvr.readUint32();
		payload.skinId = dvr.readUint32();
		payload.skinName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: ChangeCharacterDataModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			overrideSpells: payload.overrideSpells,
			modelOnly: payload.modelOnly,
			replaceCharacterPackage: payload.replaceCharacterPackage,
		});

		dvr.writeUint32(payload.id);
		dvr.writeUint32(payload.skinId);
		dvr.writeStringNullTerminated(payload.skinName, 64);
	}
}
