import BasePacket from '../BasePacket';

export default class RemoveDebugObject extends BasePacket {
	static struct = {
		objectId: 'int32',
	};
}
