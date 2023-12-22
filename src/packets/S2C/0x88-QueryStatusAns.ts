import BasePacket from '../BasePacket';

export default class QueryStatusAns extends BasePacket {
	static struct = {
		response: 'bool',
	};
}
