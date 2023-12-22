import BasePacket from '../BasePacket';

export default class RefreshAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	};
}
