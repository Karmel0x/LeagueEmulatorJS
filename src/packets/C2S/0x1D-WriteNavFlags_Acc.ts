import BasePacket from '../BasePacket';


export default class WriteNavFlags_Acc extends BasePacket {
	static struct = {
		syncId: 'int32',
	};
}
