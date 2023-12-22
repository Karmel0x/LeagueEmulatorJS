import BasePacket from '../BasePacket';


export default class ChangeEmitterGroup extends BasePacket {
	static struct = {
		groupName: ['char', 256],
		operationData: 'int32',
		groupOperation: 'int32',
	};
}
