import BasePacket from '../BasePacket';

export default class UpdateRestrictedChatCount extends BasePacket {
	static struct = {
		count: 'int32',
	};
}
