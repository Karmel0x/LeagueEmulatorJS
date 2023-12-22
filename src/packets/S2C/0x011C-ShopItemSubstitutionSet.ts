import ExtendedPacket from '../ExtendedPacket';


export default class ShopItemSubstitutionSet extends ExtendedPacket {
	static struct = {
		originalItemId: 'uint32',
		replacementItemId: 'uint32',
	};
}
