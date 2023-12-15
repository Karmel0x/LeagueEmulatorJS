import ExtendedPacket from '../ExtendedPacket.js';


export default class UpdateAscended extends ExtendedPacket {
	static struct = {
		ascendedNetId: 'uint32',
	};
}
