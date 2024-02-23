import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

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
