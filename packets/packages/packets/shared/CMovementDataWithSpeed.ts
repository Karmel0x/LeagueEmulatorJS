import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import CCompressedWaypoint, { CCompressedWaypointModel } from './CCompressedWaypoint';
import TranslateCenteredCoordinates from '../functions/translate-centered-coordinates';
import SSpeedParams, { SSpeedParamsModel } from './SSpeedParams';
import type { NetId } from '../types/player';
import { Vector2 } from 'three';

export type CMovementDataWithSpeedModel = {
	teleportNetId?: NetId,
	teleportId?: number,
	speedParams?: SSpeedParamsModel,
	compressedWaypoints?: CCompressedWaypointModel,
	waypoints?: Vector2[],
};

export default class CMovementDataWithSpeed extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as CMovementDataWithSpeedModel;
	}

	static reader(dvr: RelativeDataView, payload: CMovementDataWithSpeedModel) {
		let bitfield = dvr.readUint8();
		let waypointsSize = bitfield >> 1;
		let hasTeleportId = (bitfield & 1) != 0;

		if (waypointsSize) {
			payload.teleportNetId = dvr.readUint32();
			if (hasTeleportId) {
				payload.teleportId = dvr.readUint8();
			}

			payload.speedParams = SSpeedParams.read(dvr);

			payload.compressedWaypoints = [];
			CCompressedWaypoint.reader(dvr, payload.compressedWaypoints, waypointsSize);
			payload.waypoints = TranslateCenteredCoordinates.from(payload.compressedWaypoints);
		}
	}

	static writer(dvr: RelativeDataView, payload: CMovementDataWithSpeedModel) {
		payload.compressedWaypoints = payload.compressedWaypoints || TranslateCenteredCoordinates.to(payload.waypoints || []);
		let compressedWaypointsLength = payload.compressedWaypoints?.length || 0;

		let bitfield = 0;
		bitfield |= compressedWaypointsLength << 1;
		if (payload.teleportId)
			bitfield |= 1;

		dvr.writeUint8(bitfield);
		if (compressedWaypointsLength) {
			dvr.writeUint32(payload.teleportNetId || 0);
			if (payload.teleportId)
				dvr.writeUint8(payload.teleportId);

			SSpeedParams.writer(dvr, payload.speedParams || {} as SSpeedParamsModel);

			CCompressedWaypoint.writer(dvr, payload.compressedWaypoints);
		}
	}
}