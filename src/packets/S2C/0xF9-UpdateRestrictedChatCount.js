import BasePacket from '../BasePacket.js';

export default class UpdateRestrictedChatCount extends BasePacket {
	static struct = {
		count: 'int32',
	};
}
