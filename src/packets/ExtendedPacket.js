import BasePacket from './BasePacket.js';


export default class ExtendedPacket extends BasePacket {
	static struct_header = {
		cmd2: 'uint8',
		netId: 'uint32',
		cmd: 'uint16',
	};

	cmd2 = 0xFE;
}
