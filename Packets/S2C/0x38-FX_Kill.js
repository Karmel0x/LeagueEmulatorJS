const BasePacket = require('../BasePacket');


module.exports = class FX_Kill extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	}
};
