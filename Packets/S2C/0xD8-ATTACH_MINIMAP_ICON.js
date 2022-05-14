var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		UnitNetId: 'uint32',
		ChangeIcon: 'uint8',
		IconCategory: ['char', 64],
		ChangeBorder: 'uint8',
		BorderCategory: ['char', 64],
		BorderScriptName: 'string0',//64
	}
};
