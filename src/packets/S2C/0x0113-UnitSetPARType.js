import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetPARType extends ExtendedPacket {
	static struct = {
		parType: 'uint8',
	};
}
