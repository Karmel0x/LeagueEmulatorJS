const BasePacket = require('../BasePacket');

module.exports = class QueryStatusAns extends BasePacket {
	static struct = {
		response: 'bool',
	}
};
