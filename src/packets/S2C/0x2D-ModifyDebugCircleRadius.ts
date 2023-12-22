import BasePacket from '../BasePacket';

export default class ModifyDebugCircleRadius extends BasePacket {
	static struct = {
		objectId: 'int32',
		radius: 'float',
	};
}
