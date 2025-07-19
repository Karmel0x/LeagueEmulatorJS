import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import STipConfig, { type STipConfigModel } from '../../shared/STipConfig';

export type ClientReadyModel = BasePacketModel & {
	dummy1: string,
	tipConfig: STipConfigModel,
	dummy2: string,
};

export default class ClientReady extends BasePacket {
	static create(payload: Partial<ClientReadyModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ClientReadyModel) {
		super.reader(dvr, payload);

		payload.dummy1 = dvr.readCharArray(4);
		payload.tipConfig = STipConfig.read(dvr);
		payload.dummy2 = dvr.readStringNullTerminated(8);
	}

	static writer(dvr: RelativeDataView, payload: ClientReadyModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.dummy1, 4);
		STipConfig.writer(dvr, payload.tipConfig);
		dvr.writeStringNullTerminated(payload.dummy2, 8);
	}
}
