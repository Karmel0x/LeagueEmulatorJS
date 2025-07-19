import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type PopCharacterDataModel = BasePacketModel & {
	id: number,
};

export default class PopCharacterData extends BasePacket {
	static create(payload: Partial<PopCharacterDataModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PopCharacterDataModel) {
		super.reader(dvr, payload);

		payload.id = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: PopCharacterDataModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.id);
	}
}
