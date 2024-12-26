import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type PreloadCharacterDataModel = BasePacketModel & {
	skinId: number,
	skinName: string,
};

export default class PreloadCharacterData extends BasePacket {
	static create(payload: Partial<PreloadCharacterDataModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PreloadCharacterDataModel) {
		super.reader(dvr, payload);

		payload.skinId = dvr.readInt32();
		payload.skinName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: PreloadCharacterDataModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.skinId);
		dvr.writeStringNullTerminated(payload.skinName, 64);
	}
}
