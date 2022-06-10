var ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetShowAutoAttackIndicator extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		bitfield: ['bitfield', {
			showIndicator: 1,
			showMinimapIndicator: 2,
		}],
	}
};
