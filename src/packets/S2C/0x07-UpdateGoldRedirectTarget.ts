import BasePacket from '../BasePacket';

export default class UpdateGoldRedirectTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
