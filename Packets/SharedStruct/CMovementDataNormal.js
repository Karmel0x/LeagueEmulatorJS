
var CCompressedWaypoint = require('./CCompressedWaypoint');
var TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');

module.exports = {//CMovementDataNormal
	reader: (buffer) => {
		if (buffer.length - buffer.off < 9)
			return;

		var obj = {};
		obj.bitfield = buffer.read1('uint8');
		obj.waypointsSize = obj.bitfield >> 1;
		obj.hasTeleportId = (obj.bitfield & 1) != 0;

		if (obj.waypointsSize) {
			obj.teleportNetId = buffer.read1('uint32');
			if (obj.hasTeleportId) {
				obj.teleportId = buffer.read1('uint8');
			}
			//console.log(object, obj);
			obj.waypointsCC = CCompressedWaypoint.reader(buffer, obj.waypointsSize);
			obj.waypoints = TranslateCenteredCoordinates.from(obj.waypointsCC);
		}

		return obj;
	},
	writer: (buffer, source) => {
		source.waypointsCC = source.waypointsCC || TranslateCenteredCoordinates.to(source.waypoints);

		source.bitfield = 0;
		source.bitfield |= source.waypointsCC.length << 1;
		if (source.teleportId)
			source.bitfield |= 1;

		buffer.write1('uint8', source.bitfield);
		if (source.waypointsCC.length) {
			buffer.write1('uint32', source.teleportNetId);
			if (source.teleportId)
				buffer.write1('uint8', source.teleportId);

			CCompressedWaypoint.writer(buffer, source.waypointsCC);
		}
		//console.log('source, source.waypoints, buffer', source, source.waypoints, buffer);
	}
};
