import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetCursorReticle extends ExtendedPacket {
	static struct = {
		radius: 'float',
		secondaryRadius: 'float',
	};
}
