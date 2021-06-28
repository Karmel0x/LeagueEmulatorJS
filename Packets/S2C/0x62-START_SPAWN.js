var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.START_SPAWN
	struct = {
		BotCountOrder: 'uint8',
		BotCountChaos: 'uint8',
	}
};

	/*unk1: 'uint8',//0x40
	SkinId: 'int32',
	unk2: ['uint8', 3],
	posX: 'uint8',
	posZ: 'uint8',
	posY: 'uint8',
	rotY: 'uint8',
	dirX: 'uint8',
	dirZ: 'uint8',
	dirY: 'uint8',
	unk3: ['uint8', 2],
	scaling: ['float', 3],
	team: 'uint16',
	nPropType: 'int32',
	Name: ['char', 64],
	Model: ['char', 64],*/