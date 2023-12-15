import BasePacket from '../BasePacket.js';

export default class RemoveDebugObject extends BasePacket {
	static struct = {
		objectId: 'int32',
	};
}
