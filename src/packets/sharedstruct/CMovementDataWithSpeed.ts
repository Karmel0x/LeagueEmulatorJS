
import CCompressedWaypoint from './CCompressedWaypoint';
import TranslateCenteredCoordinates from '../../functions/TranslateCenteredCoordinates';
import SSpeedParams from './SSpeedParams';
import PacketReaderWriter from '../../core/network/binary-packet-struct';


export default {//CMovementDataWithSpeed
	reader: (buffer: PacketReaderWriter) => {
		if (buffer.length - buffer.offset < 9)
			return;

		let obj = {};
		obj.bitfield = buffer.read('uint8');
		obj.waypointsSize = obj.bitfield >> 1;
		obj.hasTeleportId = (obj.bitfield & 1) != 0;

		if (obj.waypointsSize) {
			obj.teleportNetId = buffer.read('uint32');
			if (obj.hasTeleportId) {
				obj.teleportId = buffer.read('uint8');
			}
			obj.speedParams = buffer.read(SSpeedParams);

			obj.waypointsCC = CCompressedWaypoint.reader(buffer, obj.waypointsSize);
			obj.waypoints = TranslateCenteredCoordinates.from(obj.waypointsCC);
		}

		return obj;
	},
	writer: (buffer: PacketReaderWriter, source) => {
		source.waypointsCC = source.waypointsCC || TranslateCenteredCoordinates.to(source.waypoints);

		source.bitfield = 0;
		source.bitfield |= source.waypointsCC.length << 1;
		if (source.teleportId)
			source.bitfield |= 1;

		buffer.write('uint8', source.bitfield);
		if (source.waypointsCC.length) {
			buffer.write('uint32', source.teleportNetId);
			if (source.teleportId)
				buffer.write('uint8', source.teleportId);
			buffer.write(SSpeedParams, source.speedParams);

			CCompressedWaypoint.writer(buffer, source.waypointsCC);
		}
		//console.log('source, source.waypoints, buffer', source, source.waypoints, buffer);
	}
};
