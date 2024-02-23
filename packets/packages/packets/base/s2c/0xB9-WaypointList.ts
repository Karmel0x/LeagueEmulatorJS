import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type WaypointListModel = BasePacketModel & {
	syncId: number,
	waypoints: SVector2Model[],
};

export default class WaypointList extends BasePacket {
	static create(payload: Partial<WaypointListModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WaypointListModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		const count = dvr.bytesLeft / 8;
		payload.waypoints = dvr.readArray(() => SVector2.read(dvr), count);
	}

	static writer(dvr: RelativeDataView, payload: WaypointListModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);

		payload.waypoints.forEach(waypoint => SVector2.writer(dvr, waypoint));
	}
}
