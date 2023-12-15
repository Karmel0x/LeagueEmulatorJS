import BasePacket from '../BasePacket.js';
import SVector2 from '../sharedstruct/SVector2.js';


export default class WaypointList extends BasePacket {
	static struct = {
		syncId: 'int32',
	};
	reader(buffer) {
		super.reader(buffer);

		this.waypoints = buffer.read([SVector2, ((buffer.length - buffer.offset) / 8)]);
	}
	writer(buffer) {
		super.writer(buffer);

		buffer.write([SVector2, this.waypoints.length], this.waypoints);
	}
}
