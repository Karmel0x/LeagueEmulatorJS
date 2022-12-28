const BasePacket = require('../BasePacket');
var SConnectionInfo = require('../SharedStruct/SConnectionInfo');


module.exports = class Ping_Load_Info extends BasePacket {
	static struct = SConnectionInfo
};
