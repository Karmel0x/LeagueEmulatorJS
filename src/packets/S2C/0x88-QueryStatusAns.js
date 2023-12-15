import BasePacket from '../BasePacket.js';

export default class QueryStatusAns extends BasePacket {
	static struct = {
		response: 'bool',
	};
}
