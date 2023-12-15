import BasePacket from '../BasePacket.js';

export default class RefreshAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	};
}
