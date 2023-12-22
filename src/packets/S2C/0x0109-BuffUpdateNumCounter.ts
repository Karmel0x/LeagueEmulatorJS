import ExtendedPacket from '../ExtendedPacket';


export default class BuffUpdateNumCounter extends ExtendedPacket {
	static struct = {
		buffSlot: 'uint8',
		counter: 'int32',
	};
}
