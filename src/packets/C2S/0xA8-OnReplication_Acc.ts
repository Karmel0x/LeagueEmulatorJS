import BasePacket from '../BasePacket';


export default class OnReplication_Acc extends BasePacket {
	static struct = {
		syncId: 'uint32',
	};
}
