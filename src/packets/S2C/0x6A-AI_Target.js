import BasePacket from '../BasePacket.js';


export default class AI_Target extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
