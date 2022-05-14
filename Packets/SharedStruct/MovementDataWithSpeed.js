
var CompressedWaypoint = require('./CompressedWaypoint');
var TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');
const Vector2 = require('./Vector2');
const SpeedParams = require('./SpeedParams');


module.exports = {//MovementDataWithSpeed
	reader: (buffer) => {
		if(buffer.size - buffer.off < 9)
			return;

		var obj = {};
		obj.bitfield = buffer.read1('uint8');
		obj.WaypointsSize = obj.bitfield >> 1;
		obj.HasTeleportID = (obj.bitfield & 1) != 0;

		if(obj.WaypointsSize){
			obj.TeleportNetId = buffer.read1('uint32');
			if(obj.HasTeleportID){
				obj.TeleportID = buffer.read1('uint8');
			}
			obj.SpeedParams = buffer.readobj(SpeedParams);

			obj.WaypointsCC = CompressedWaypoint.reader(buffer, obj.WaypointsSize);
			obj.Waypoints = TranslateCenteredCoordinates.from(obj.WaypointsCC);
		}

		return obj;
	},
	writer: (buffer, source) => {
		source.WaypointsCC = source.WaypointsCC || TranslateCenteredCoordinates.to(source.Waypoints);

		source.bitfield = 0;
		source.bitfield |= source.WaypointsCC.length << 1;
		if(source.TeleportID)
			source.bitfield |= 1;
	
		buffer.write1('uint8', source.bitfield);
		if(source.WaypointsCC.length){
			buffer.write1('uint32', source.TeleportNetId);
			if(source.TeleportID)
				buffer.write1('uint8', source.TeleportID);
			buffer.writeobj(SpeedParams, source.SpeedParams);
	
			CompressedWaypoint.writer(buffer, source.WaypointsCC);
		}
		//console.log('source, source.Waypoints, buffer', source, source.Waypoints, buffer);
	}
};
