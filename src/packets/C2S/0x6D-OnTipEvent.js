import BasePacket from '../BasePacket.js';


export default class OnTipEvent extends BasePacket {
	static struct = {
		tipCommand: 'uint8',
		tipId: 'uint32',
	};
}
