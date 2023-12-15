import BasePacket from '../BasePacket.js';


export default class SendSelectedObjId extends BasePacket {
	static struct = {
		clientId: 'int32',
		selectedNetId: 'uint32',
	};
}
