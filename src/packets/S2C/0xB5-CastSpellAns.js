const BasePacket = require('../BasePacket');
const SCastInfo = require('../sharedstruct/SCastInfo');


module.exports = class CastSpellAns extends BasePacket {
	static struct = {
		casterPositionSyncId: 'int32',
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	}
	reader(buffer) {
		super.reader(buffer);
		this.castInfo = SCastInfo.reader(buffer);
	}
	writer(buffer) {
		super.writer(buffer);
		SCastInfo.writer(buffer, this.castInfo);
	}
};
