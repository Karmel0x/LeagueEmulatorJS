import BasePacket from '../BasePacket.js';


export default class WriteNavFlags_Acc extends BasePacket {
	static struct = {
		syncId: 'int32',
	};
}
