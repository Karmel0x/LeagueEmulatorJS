var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetNetID: 'uint32',
		SourceNetID: 'uint32',
		GoldAmmount: 'float',
	}
};
