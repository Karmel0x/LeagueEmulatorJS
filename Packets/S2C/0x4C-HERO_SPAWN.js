var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.HERO_SPAWN
	struct = {
		NetID: 'uint32',
		ClientID: 'int32',
		NetNodeID: 'uint8',
		SkillLevel: 'uint8',
		TeamIsOrder_IsBot_bitfield1: 'uint8',
		BotRank: 'uint8',
		SpawnPositionIndex: 'uint8',
		SkinID: 'int32',
		Name: ['char', 128],
		Skin: ['char', 40],
		DeathDurationRemaining: 'float',
		TimeSinceDeath: 'float',
		CreateHeroDeath: 'uint32',
		Unknown1_Unknown2_bitfield2: 'uint8',
	}
};
