import BasePacket from '../BasePacket';


export default class SendSelectedObjId extends BasePacket {
	static struct = {
		clientId: 'int32',
		selectedNetId: 'uint32',
	};
}
