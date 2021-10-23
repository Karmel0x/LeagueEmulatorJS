var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		AIName: 'string0',
		AIStrategy: 'string0',
		AIBehaviour: 'string0',
		AITask: 'string0',
		States: ['string0', 3],
	}
};
