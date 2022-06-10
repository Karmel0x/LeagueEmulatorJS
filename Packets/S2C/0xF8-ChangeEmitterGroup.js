const BasePacket = require('../BasePacket');


module.exports = class ChangeEmitterGroup extends BasePacket {
	static struct = {
		groupName: ['char', 256],
		operationData: 'int32',
		groupOperation: 'int32',
	}
};
