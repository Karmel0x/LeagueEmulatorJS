
var CCompressedWaypoint = require('./CCompressedWaypoint');
var TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');
const SSpeedParams = require('./SSpeedParams');


module.exports = {//CMovementDataWithSpeed
	reader: (buffer) => {
		if(buffer.length - buffer.off < 9)
			return;

		var obj = {};
		obj.bitfield = buffer.read1('uint8');
		obj.waypointsSize = obj.bitfield >> 1;
		obj.hasTeleportID = (obj.bitfield & 1) != 0;

		if(obj.waypointsSize){
			obj.teleportNetId = buffer.read1('uint32');
			if(obj.hasTeleportID){
				obj.teleportID = buffer.read1('uint8');
			}
			obj.speedParams = buffer.readobj(SSpeedParams);

			obj.waypointsCC = CCompressedWaypoint.reader(buffer, obj.waypointsSize);
			obj.waypoints = TranslateCenteredCoordinates.from(obj.waypointsCC);
		}

		return obj;
	},
	writer: (buffer, source) => {
		source.waypointsCC = source.waypointsCC || TranslateCenteredCoordinates.to(source.waypoints);

		source.bitfield = 0;
		source.bitfield |= source.waypointsCC.length << 1;
		if(source.teleportID)
			source.bitfield |= 1;
	
		buffer.write1('uint8', source.bitfield);
		if(source.waypointsCC.length){
			buffer.write1('uint32', source.teleportNetId);
			if(source.teleportID)
				buffer.write1('uint8', source.teleportID);
			buffer.writeobj(SSpeedParams, source.speedParams);
	
			CCompressedWaypoint.writer(buffer, source.waypointsCC);
		}
		//console.log('source, source.waypoints, buffer', source, source.waypoints, buffer);
	}
};
