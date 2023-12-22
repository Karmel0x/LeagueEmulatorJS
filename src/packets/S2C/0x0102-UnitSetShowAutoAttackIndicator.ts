import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetShowAutoAttackIndicator extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		bitfield: ['bitfield', {
			showIndicator: 1,
			showMinimapIndicator: 2,
		}],
	};
}
