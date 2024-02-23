import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SynchSimTimeS2CModel = BasePacketModel & {
	time: number,
};

export default class SynchSimTimeS2C extends BasePacket {
	static create(payload: Partial<SynchSimTimeS2CModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SynchSimTimeS2CModel) {
		super.reader(dvr, payload);

		payload.time = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SynchSimTimeS2CModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.time);
	}
}
