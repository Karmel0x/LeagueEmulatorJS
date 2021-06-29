var BasePacket = require('../BasePacket');
var ConnectionInfo = require('../SharedStruct/ConnectionInfo');

module.exports = class extends BasePacket {//C2S.PING_LOAD_INFO
	struct = ConnectionInfo
};
