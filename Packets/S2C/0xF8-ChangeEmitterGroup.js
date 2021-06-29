var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		GroupName: ['char', 256],
		OperationData: 'int32',
		GroupOperation: 'int32',
	}
};
