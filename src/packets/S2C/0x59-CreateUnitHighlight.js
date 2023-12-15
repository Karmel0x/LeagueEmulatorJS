import BasePacket from '../BasePacket.js';

export default class CreateUnitHighlight extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
