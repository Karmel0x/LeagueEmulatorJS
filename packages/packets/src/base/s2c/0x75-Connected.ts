import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId } from '../../types/player';

export type ConnectedModel = BasePacketModel & {
	clientId: ClientId,
};

export default class Connected extends BasePacket {
	static create(payload: Partial<ConnectedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ConnectedModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ConnectedModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
	}
}