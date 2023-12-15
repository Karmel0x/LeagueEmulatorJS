import BasePacket from '../BasePacket.js';

export default class ModifyDebugText extends BasePacket {
	static struct = {
		text: 'string',
	};
}
