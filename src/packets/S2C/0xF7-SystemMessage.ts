import BasePacket from '../BasePacket';

/**
 * Orange message on chat box
 */
export default class SystemMessage extends BasePacket {
	static struct = {
		sourceNetId: 'uint32',
		message: 'string0',//512
	};
}
