import BasePacket from '../BasePacket.js';


export default class SetFadeOut_Pop extends BasePacket {
	static struct = {
		stackId: 'int16',
	};
}
