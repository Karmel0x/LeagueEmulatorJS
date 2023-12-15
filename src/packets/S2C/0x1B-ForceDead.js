import BasePacket from '../BasePacket.js';


export default class ForceDead extends BasePacket {
	static struct = {
		deathDuration: 'float',
	};
}
