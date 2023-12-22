import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetPARType extends ExtendedPacket {
	static struct = {
		parType: 'uint8',
	};
}
