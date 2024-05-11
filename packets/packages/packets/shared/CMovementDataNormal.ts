import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import CCompressedWaypoint, { CCompressedWaypointModel } from './CCompressedWaypoint';
import TranslateCenteredCoordinates from '../functions/translate-centered-coordinates';
import type { NetId } from '../types/player';
import { Vector2 } from 'three';

export type CMovementDataNormalModel = {
	teleportNetId?: NetId,
	teleportId?: number,
	compressedWaypoints?: CCompressedWaypointModel,
	waypoints?: Vector2[],
};

export default class CMovementDataNormal extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as CMovementDataNormalModel;
	}

	static reader(dvr: RelativeDataView, payload: CMovementDataNormalModel) {
		let bitfield = dvr.readUint16();
		let hasTeleportId = (bitfield & 1) != 0;

		let bitfield2 = dvr.readUint16();
		let waypointsSize = bitfield2 & 0x7F;

		if (waypointsSize) {
			payload.teleportNetId = dvr.readUint32();
			if (hasTeleportId) {
				payload.teleportId = dvr.readUint8();
			}

			payload.compressedWaypoints = [];
			CCompressedWaypoint.reader(dvr, payload.compressedWaypoints, waypointsSize);
			payload.waypoints = TranslateCenteredCoordinates.from(payload.compressedWaypoints);
		}
	}

	static writer(dvr: RelativeDataView, payload: CMovementDataNormalModel) {
		payload.compressedWaypoints = payload.compressedWaypoints || TranslateCenteredCoordinates.to(payload.waypoints || []);
		let compressedWaypointsLength = payload.compressedWaypoints?.length || 0;

		let bitfield = 0;
		//bitfield |= compressedWaypointsLength << 1;
		if (payload.teleportId)
			bitfield |= 1;

		dvr.writeUint16(bitfield);
		let bitfield2 = compressedWaypointsLength & 0x7F;
		dvr.writeUint16(bitfield2);
		if (compressedWaypointsLength) {
			dvr.writeUint32(payload.teleportNetId || 0);
			if (payload.teleportId)
				dvr.writeUint8(payload.teleportId);

			CCompressedWaypoint.writer(dvr, payload.compressedWaypoints);
		}
	}
}