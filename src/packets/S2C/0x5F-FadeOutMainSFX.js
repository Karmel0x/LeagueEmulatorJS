import BasePacket from '../BasePacket.js';


export default class FadeOutMainSFX extends BasePacket {
	static struct = {
		fadeTime: 'float',
	};
}
