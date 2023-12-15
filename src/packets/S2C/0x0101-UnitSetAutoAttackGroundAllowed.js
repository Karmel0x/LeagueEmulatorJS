import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetAutoAttackGroundAllowed extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		canAutoAttackGroundState: 'uint8',
	};
}
