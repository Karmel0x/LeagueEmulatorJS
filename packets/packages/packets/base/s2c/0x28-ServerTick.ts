import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ServerTickModel = BasePacketModel & {
	delta: number,
};

export default class ServerTick extends BasePacket {
	static create(payload: Partial<ServerTickModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ServerTickModel) {
		super.reader(dvr, payload);

		payload.delta = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ServerTickModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.delta);
	}
}
