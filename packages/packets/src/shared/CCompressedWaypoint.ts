import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import BinaryHelper from '../functions/binary-helper';

export type CCompressedWaypointModel = { x: number, y: number }[];

export default class CCompressedWaypoint extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as CCompressedWaypointModel;
	}

	static reader(dvr: RelativeDataView, payload: CCompressedWaypointModel, size: number = 0) {
		let flagsBuffer: boolean[] = [];
		if (size > 1) {
			let flagsBufferByte = dvr.readByteArray(Math.floor((size - 2) / 4 + 1));
			flagsBuffer = BinaryHelper.byteArrayToBinary(flagsBufferByte);
		}

		let lastX = dvr.readInt16();
		let lastY = dvr.readInt16();
		payload.push({ x: lastX, y: lastY });

		for (let i = 1, flag = 0; i < size; i++) {
			if (flagsBuffer[flag++])
				lastX += dvr.readInt8();
			else
				lastX = dvr.readInt16();

			if (flagsBuffer[flag++])
				lastY += dvr.readInt8();
			else
				lastY = dvr.readInt16();

			payload.push({ x: lastX, y: lastY });
		}
	}

	static writer(dvr: RelativeDataView, payload: CCompressedWaypointModel) {

		let waypoints = payload || [];
		if (waypoints.length < 1)
			return;

		let relativeWaypoints = [];
		let flagsBinary = '';

		if (waypoints.length > 1) {
			for (let i = 1; i < waypoints.length; i++) {
				let relativeWaypoint = {
					x: waypoints[i].x - waypoints[i - 1].x,
					y: waypoints[i].y - waypoints[i - 1].y,
				};
				relativeWaypoints.push(relativeWaypoint);

				flagsBinary += +(relativeWaypoint.x >= -128 && relativeWaypoint.x <= 127);
				flagsBinary += +(relativeWaypoint.y >= -128 && relativeWaypoint.y <= 127);
			}

			let flagsBuffer = BinaryHelper.binaryStringToNumberByteArray(flagsBinary, 8);
			let flagsCount = Math.floor((waypoints.length - 2) / 4 + 1);
			dvr.writeByteArray(flagsBuffer.slice(0, flagsCount));
		}

		dvr.writeInt16(waypoints[0].x);
		dvr.writeInt16(waypoints[0].y);

		for (let i = 0; i < relativeWaypoints.length; i++) {
			let relativeWaypoint = relativeWaypoints[i];

			if (relativeWaypoint.x >= -128 && relativeWaypoint.x <= 127) {
				dvr.writeInt8(relativeWaypoint.x);
			} else {
				let waypoint = waypoints[i + 1];
				dvr.writeInt16(waypoint.x);
			}

			if (relativeWaypoint.y >= -128 && relativeWaypoint.y <= 127) {
				dvr.writeInt8(relativeWaypoint.y);
			} else {
				let waypoint = waypoints[i + 1];
				dvr.writeInt16(waypoint.y);
			}
		}
	}
}
