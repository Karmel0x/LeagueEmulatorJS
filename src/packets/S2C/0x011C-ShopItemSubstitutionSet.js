import ExtendedPacket from '../ExtendedPacket.js';


export default class ShopItemSubstitutionSet extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
		replacementItemId: 'uint32',
	};
}
