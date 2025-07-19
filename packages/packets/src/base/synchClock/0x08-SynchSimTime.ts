import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SynchSimTimeModel = BasePacketModel & {
	timeLastServer: number,
	timeLastClient: number,
};

export default class SynchSimTime extends BasePacket {
	static create(payload: Partial<SynchSimTimeModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SynchSimTimeModel) {
		super.reader(dvr, payload);

		payload.timeLastServer = dvr.readFloat();
		payload.timeLastClient = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SynchSimTimeModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.timeLastServer);
		dvr.writeFloat(payload.timeLastClient);
	}
}
