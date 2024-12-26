import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SpectatorMetaDataModel = BasePacketModel & {
	jsonMetaData: string,
};

export default class SpectatorMetaData extends BasePacket {
	static create(payload: Partial<SpectatorMetaDataModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpectatorMetaDataModel) {
		super.reader(dvr, payload);

		payload.jsonMetaData = dvr.readString();
	}

	static writer(dvr: RelativeDataView, payload: SpectatorMetaDataModel) {
		super.writer(dvr, payload);

		dvr.writeString(payload.jsonMetaData);
	}
}
