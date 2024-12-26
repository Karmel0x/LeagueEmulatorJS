import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { RespawnPointEvent } from '../s2c/0xD5-HandleRespawnPointUpdate';

export type OnRespawnPointEventModel = BasePacketModel & {
	respawnPointEvent: RespawnPointEvent,
	respawnPointUiId: number,
};

export default class OnRespawnPointEvent extends BasePacket {
	static create(payload: Partial<OnRespawnPointEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnRespawnPointEventModel) {
		super.reader(dvr, payload);

		payload.respawnPointEvent = dvr.readUint8();
		payload.respawnPointUiId = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: OnRespawnPointEventModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.respawnPointEvent);
		dvr.writeUint8(payload.respawnPointUiId);
	}
}
