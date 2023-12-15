import ExtendedPacket from '../ExtendedPacket.js';


export default class SetFadeOut extends ExtendedPacket {
	static struct = {
		fadeTime: 'float',
		fadeTargetValue: 'float',
	};
}
