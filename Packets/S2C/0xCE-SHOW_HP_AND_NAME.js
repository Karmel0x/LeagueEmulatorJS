var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			ShowHealthBar: 1,
			ChangeHealthBarType: 2,
		}],
		HealthBarType: 'uint8',
		ObserverTeamID: ['uint32', 'ChangeHealthBarTypec'],
	}
};
