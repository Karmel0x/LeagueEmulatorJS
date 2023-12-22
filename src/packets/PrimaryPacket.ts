import BasePacket from './BasePacket';

export default class PrimaryPacket extends BasePacket {

	static struct_header = {
		cmd: 'uint8',
	};

}
