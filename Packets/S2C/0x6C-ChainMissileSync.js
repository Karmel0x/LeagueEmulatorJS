var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetCount: 'int32',
		OwnerNetworkID: 'uint32',
		TargetNetIds: ['uint32', 32],
	}
};
