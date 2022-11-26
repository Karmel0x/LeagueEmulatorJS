const BasePacket = require('../BasePacket');

var Talent = {
	hash: 'uint32',
	level: 'uint8',
};


module.exports = class AvatarInfo_Server extends BasePacket {
	static struct = {
		itemIds: ['uint32', 30],
		summonerIds: ['uint32', 2],
		summonerIds2: ['uint32', 2],
		talents: [Talent, 80],
		level: 'uint8',
		//wardSkin: 'uint8',
	}
};
