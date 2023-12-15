import BasePacket from '../BasePacket.js';


export default class FadeMinions extends BasePacket {
	static struct = {
		team: 'uint8',
		fadeAmount: 'float',
		fadeTime: 'float',
	};
}
