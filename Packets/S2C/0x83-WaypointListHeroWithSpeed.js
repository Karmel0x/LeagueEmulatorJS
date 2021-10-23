var BasePacket = require('../BasePacket');
const Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SyncID: 'int32',
		//WaypointSpeedParams: 'ReadWaypointSpeedParams',
		//Waypoints: Vector2,//while(reader.BytesLeft >= 8)
	}
};
