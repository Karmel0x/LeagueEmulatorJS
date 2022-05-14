var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetNetId: 'uint32',
		SourceNetId: 'uint32',
		GoldAmmount: 'float',
	}
};
