const ExtendedPacket = require('../ExtendedPacket');


module.exports = class ShopItemSubstitutionSet extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
		replacementItemId: 'uint32',
	}
};
