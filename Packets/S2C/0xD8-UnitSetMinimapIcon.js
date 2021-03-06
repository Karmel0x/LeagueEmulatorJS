const BasePacket = require('../BasePacket');


// packet lenght should be 203
module.exports = class UnitSetMinimapIcon extends BasePacket {
	static struct = {
		unitNetId: 'uint32',
		changeIcon: 'uint8',//bitfield & 1 ?
		iconCategory: ['char', 64],
		changeBorder: 'uint8',//bitfield & 1 ?
		borderCategory: ['char', 64],
		borderScriptName: ['char', 64],
		//borderScriptName: 'string0',//64
	}
};
