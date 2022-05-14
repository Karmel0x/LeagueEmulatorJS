var BasePacket = require('../BasePacket');
const SpeedParams = require('../SharedStruct/SpeedParams');
const Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		SyncID: 'int32',
		WaypointSpeedParams: SpeedParams,
	}
	reader(buffer){
		super.reader(buffer);

		this.Waypoints = buffer.readobj([Vector2, ((buffer.length - buffer.off) / 8)]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj([Vector2, ((buffer.length - buffer.off) / 8)], this.Waypoints);
	}
};
