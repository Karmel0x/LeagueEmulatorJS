import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetShowAutoAttackIndicator extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		bitfield: ['bitfield', {
			showIndicator: 1,
			showMinimapIndicator: 2,
		}],
	};
}
