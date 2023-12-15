import BasePacket from '../BasePacket.js';


export default class ColorRemapFX extends BasePacket {
	static struct = {
		isFadingIn: 'uint8',
		fadeTime: 'float',
		team: 'uint32',
		color: 'uint32',
		maxWeight: 'float',
	};
}
