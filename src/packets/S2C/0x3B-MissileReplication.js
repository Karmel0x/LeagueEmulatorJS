import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';
import SCastInfo from '../sharedstruct/SCastInfo.js';


export default class MissileReplication extends BasePacket {
	static struct = {
		position: SVector3,
		casterPosition: SVector3,
		direction: SVector3,
		velocity: SVector3,
		startPoint: SVector3,
		endPoint: SVector3,
		unitPosition: SVector3,
		timeFromCreation: 'float',
		speed: 'float',
		lifePercentage: 'float',
		timedSpeedDelta: 'float',
		timedSpeedDeltaTime: 'float',
		bitfield: ['bitfield', {
			bounced: 1,
		}],
	};
	reader(buffer) {
		super.reader(buffer);
		this.castInfo = SCastInfo.reader(buffer);
	}
	writer(buffer) {
		super.writer(buffer);
		SCastInfo.writer(buffer, this.castInfo);
	}
}
