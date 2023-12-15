import BasePacket from './BasePacket.js';

export default class PrimaryPacket extends BasePacket {

	static struct_header = {
		cmd: 'uint8',
	};

}
