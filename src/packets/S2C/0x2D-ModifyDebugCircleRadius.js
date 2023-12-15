import BasePacket from '../BasePacket.js';

export default class ModifyDebugCircleRadius extends BasePacket {
	static struct = {
		objectId: 'int32',
		radius: 'float',
	};
}
