import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';
import type { ClientId } from '../../types/player';

export type World_SendCamera_ServerModel = BasePacketModel & {
	position: SVector3Model,
	direction: SVector3Model,
	clientId: ClientId,
	syncId: number,
};

export default class World_SendCamera_Server extends BasePacket {
	static create(payload: Partial<World_SendCamera_ServerModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: World_SendCamera_ServerModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
		payload.direction = SVector3.read(dvr);
		payload.clientId = dvr.readUint32();
		payload.syncId = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: World_SendCamera_ServerModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.direction);
		dvr.writeUint32(payload.clientId);
		dvr.writeUint8(payload.syncId);
	}
}
