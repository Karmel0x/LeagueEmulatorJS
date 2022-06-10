const BasePacket = require('../BasePacket');


module.exports = class SetHoverIndicatorTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
