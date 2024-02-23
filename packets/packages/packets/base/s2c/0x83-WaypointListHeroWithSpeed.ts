import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SSpeedParams, { SSpeedParamsModel } from '../../shared/SSpeedParams';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type WaypointListHeroWithSpeedModel = BasePacketModel & {
	syncId: number,
	speedParams: SSpeedParamsModel,
	waypoints: SVector2Model[],
};

export default class WaypointListHeroWithSpeed extends BasePacket {
	static create(payload: Partial<WaypointListHeroWithSpeedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WaypointListHeroWithSpeedModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();
		payload.speedParams = SSpeedParams.read(dvr);

		const waypointsLength = dvr.bytesLeft / 8;
		payload.waypoints = dvr.readArray(() => SVector2.read(dvr), waypointsLength);
	}

	static writer(dvr: RelativeDataView, payload: WaypointListHeroWithSpeedModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);
		SSpeedParams.writer(dvr, payload.speedParams);

		payload.waypoints.forEach(waypoint => SVector2.writer(dvr, waypoint));
	}
}
