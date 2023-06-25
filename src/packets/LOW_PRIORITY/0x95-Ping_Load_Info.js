const BasePacket = require('../BasePacket');
const SConnectionInfo = require('../sharedstruct/SConnectionInfo');


module.exports = class Ping_Load_Info extends BasePacket {
	static struct = SConnectionInfo;
};
