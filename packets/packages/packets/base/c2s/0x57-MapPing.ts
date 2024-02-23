import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import type { NetId } from '../../types/player';
import { PingCategory } from '../s2c/0x40-MapPing';

export type MapPingC2SModel = BasePacketModel & {
	position: SVector2Model,
	targetNetId: NetId,
	pingCategory: PingCategory,
};

export default class MapPingC2S extends BasePacket {
	static create(payload: Partial<MapPingC2SModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: MapPingC2SModel) {
		super.reader(dvr, payload);

		payload.position = SVector2.read(dvr);
		payload.targetNetId = dvr.readUint32();

		payload.pingCategory = dvr.readUint8();//(bitfield & 0x0F) ?
	}

	static writer(dvr: RelativeDataView, payload: MapPingC2SModel) {
		super.writer(dvr, payload);

		SVector2.writer(dvr, payload.position);
		dvr.writeUint32(payload.targetNetId);

		dvr.writeUint8(payload.pingCategory);
	}
}
