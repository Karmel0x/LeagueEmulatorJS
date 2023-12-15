import BasePacket from '../BasePacket.js';


export default class SynchVersion extends BasePacket {
	static struct = {
		clientId: 'int32',
		version: ['char', 256],
		//version: 'string0',//256
	};
}
