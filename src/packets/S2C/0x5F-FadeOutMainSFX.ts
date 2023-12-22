import BasePacket from '../BasePacket';


export default class FadeOutMainSFX extends BasePacket {
	static struct = {
		fadeTime: 'float',
	};
}
