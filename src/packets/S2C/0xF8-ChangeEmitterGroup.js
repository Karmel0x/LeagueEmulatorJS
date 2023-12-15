import BasePacket from '../BasePacket.js';


export default class ChangeEmitterGroup extends BasePacket {
	static struct = {
		groupName: ['char', 256],
		operationData: 'int32',
		groupOperation: 'int32',
	};
}
