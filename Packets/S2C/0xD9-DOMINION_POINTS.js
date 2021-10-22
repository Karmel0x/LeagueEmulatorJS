var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		PlayerNetID: 'uint32',
		ScoreCategory: 'uint8',
		ScoreEvent: 'uint8',
		bitfield_ShouldCallout: 'uint8',
		PointValue: 'float',
		TotalPointValue: 'float',
	}
};
