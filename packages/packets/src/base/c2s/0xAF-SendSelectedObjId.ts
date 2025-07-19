import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId, NetId } from '../../types/player';

export type SendSelectedObjIdModel = BasePacketModel & {
	clientId: ClientId,
	selectedNetId: NetId,
};

export default class SendSelectedObjId extends BasePacket {
	static create(payload: Partial<SendSelectedObjIdModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SendSelectedObjIdModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
		payload.selectedNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: SendSelectedObjIdModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
		dvr.writeUint32(payload.selectedNetId);
	}
}
