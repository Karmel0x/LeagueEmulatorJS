const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetAutoAttackGroundAllowed extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		canAutoAttackGroundState: 'uint8',
	}
};
