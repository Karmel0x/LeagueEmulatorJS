import BasePacket from '../BasePacket.js';


export default class UseObject extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
