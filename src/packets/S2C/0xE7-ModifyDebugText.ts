import BasePacket from '../BasePacket';

export default class ModifyDebugText extends BasePacket {
	static struct = {
		text: 'string',
	};
}
