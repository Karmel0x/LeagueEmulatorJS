var BasePacket = require('../BasePacket');

var Talent = {
	Hash: 'uint32',
	level: 'uint8',
};


module.exports = class extends BasePacket {//S2C.AVATAR_INFO
	struct = {
		ItemIDs: ['uint32', 30],
		SummonerIDs: ['uint32', 2],
		SummonerIDs2: ['uint32', 2],
		Talents: [Talent, 80],
		level: 'uint8',
		WardSkin: 'uint8',
	}
};
