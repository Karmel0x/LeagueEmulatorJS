const ExtendedPacket = require('../ExtendedPacket');


module.exports = class ShopItemSubstitutionClear extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
	}
};
