import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetCursorReticle extends ExtendedPacket {
	static struct = {
		radius: 'float',
		secondaryRadius: 'float',
	};
}
