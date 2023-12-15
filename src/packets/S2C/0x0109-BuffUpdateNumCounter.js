import ExtendedPacket from '../ExtendedPacket.js';


export default class BuffUpdateNumCounter extends ExtendedPacket {
	static struct = {
		buffSlot: 'uint8',
		counter: 'int32',
	};
}
