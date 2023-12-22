import BasePacket from '../BasePacket';

export default class CreateUnitHighlight extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
