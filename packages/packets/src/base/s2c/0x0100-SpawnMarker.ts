import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type SpawnMarkerModel = BasePacketModel & {
	objectNetId: number,
	netNodeId: number,
	position: SVector3Model,
	visibilitySize: number,
};

export default class SpawnMarker extends BasePacket {
	static create(payload: Partial<SpawnMarkerModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpawnMarkerModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.visibilitySize = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SpawnMarkerModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		SVector3.writer(dvr, payload.position);
		dvr.writeFloat(payload.visibilitySize);
	}
}
