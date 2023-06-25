const BasePacket = require('../BasePacket');

module.exports = class RemoveUnitHighlight extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	}
};
