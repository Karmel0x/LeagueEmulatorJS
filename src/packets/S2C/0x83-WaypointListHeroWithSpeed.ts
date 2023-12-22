import BasePacket from '../BasePacket';
import SSpeedParams from '../sharedstruct/SSpeedParams';
import SVector2 from '../sharedstruct/SVector2';


export default class WaypointListHeroWithSpeed extends BasePacket {
	static struct = {
		syncId: 'int32',
		waypointSpeedParams: SSpeedParams,
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
