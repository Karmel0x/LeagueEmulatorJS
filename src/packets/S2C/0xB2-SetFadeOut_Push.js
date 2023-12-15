import BasePacket from '../BasePacket.js';


export default class SetFadeOut_Push extends BasePacket {
	static struct = {
		fadeId: 'int16',
		fadeTime: 'float',
		fadeTargetValue: 'float',
	};
}
