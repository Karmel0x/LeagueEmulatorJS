import ExtendedPacket from '../ExtendedPacket';


export default class ShopItemSubstitutionClear extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
	};
}
