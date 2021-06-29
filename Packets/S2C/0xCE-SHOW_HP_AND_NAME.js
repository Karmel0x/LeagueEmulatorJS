var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.ShowHealthBar = (bitfield & 1) != 0;
        //this.ChangeHealthBarType = (bitfield & 2) != 0;
		HealthBarType: 'uint8',
		ObserverTeamID: ['uint32', 'ChangeHealthBarTypec'],
	}
};
