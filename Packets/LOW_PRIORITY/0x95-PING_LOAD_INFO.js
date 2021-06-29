var BasePacket = require('../BasePacket');
var ConnectionInfo = require('../SharedStruct/ConnectionInfo');


module.exports = class extends BasePacket {//LOW_PRIORITY.PING_LOAD_INFO
	struct = ConnectionInfo
};
