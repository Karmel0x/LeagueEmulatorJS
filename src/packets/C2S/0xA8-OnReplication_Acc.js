import BasePacket from '../BasePacket.js';


export default class OnReplication_Acc extends BasePacket {
	static struct = {
		syncId: 'uint32',
	};
}
