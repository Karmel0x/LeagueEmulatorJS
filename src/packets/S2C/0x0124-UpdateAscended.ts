import ExtendedPacket from '../ExtendedPacket';


export default class UpdateAscended extends ExtendedPacket {
	static struct = {
		ascendedNetId: 'uint32',
	};
}
