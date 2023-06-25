const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');


module.exports = class WaypointList extends BasePacket {
	static struct = {
		syncId: 'int32',
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
