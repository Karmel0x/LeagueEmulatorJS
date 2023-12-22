import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetSpellPARCost extends ExtendedPacket {
	static struct = {
		costType: 'uint8',
		spellSlot: 'int32',
		amount: 'float',
	};
}
