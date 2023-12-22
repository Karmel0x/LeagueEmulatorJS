import BasePacket from '../BasePacket';

export default class ModifyDebugObjectColor extends BasePacket {
	static struct = {
		objectId: 'int32',
		color: 'uint32',
	};
}
