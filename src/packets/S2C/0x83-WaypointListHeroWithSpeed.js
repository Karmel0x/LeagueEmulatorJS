const BasePacket = require('../BasePacket');
const SSpeedParams = require('../sharedstruct/SSpeedParams');
const SVector2 = require('../sharedstruct/SVector2');


module.exports = class WaypointListHeroWithSpeed extends BasePacket {
	static struct = {
		syncId: 'int32',
		waypointSpeedParams: SSpeedParams,
	}
	reader(buffer) {
		super.reader(buffer);

		this.waypoints = buffer.readobj([SVector2, ((buffer.length - buffer.off) / 8)]);
	}
	writer(buffer) {
		super.writer(buffer);

		buffer.writeobj([SVector2, this.waypoints.length], this.waypoints);
	}
};
