var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SyncID: 'int32',
		size: 'int16',
		//NavFlagCricles: ['ReadNavFlagCricle', size],
	}
};
