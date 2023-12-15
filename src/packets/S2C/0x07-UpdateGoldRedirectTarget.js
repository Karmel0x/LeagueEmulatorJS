import BasePacket from '../BasePacket.js';

export default class UpdateGoldRedirectTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
