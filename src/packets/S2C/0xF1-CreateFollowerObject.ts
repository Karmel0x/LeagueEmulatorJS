import BasePacket from '../BasePacket';

export default class CreateFollowerObject extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		skinId: 'int32',
		internalName: ['char', 64],
		characterName: 'string0',//64
	};
}
