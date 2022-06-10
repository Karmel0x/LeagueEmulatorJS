const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');
var SCastInfo = require('../SharedStruct/SCastInfo');


module.exports = class MissileReplication extends BasePacket {
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
	}
	reader(buffer){
		super.reader(buffer);
		this.castInfo = SCastInfo.reader(buffer);
	}
	writer(buffer){
		super.writer(buffer);
		SCastInfo.writer(buffer, this.castInfo);
	}
};
