import ExtendedPacket from '../ExtendedPacket.js';


export default class ShopItemSubstitutionClear extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
	};
}
