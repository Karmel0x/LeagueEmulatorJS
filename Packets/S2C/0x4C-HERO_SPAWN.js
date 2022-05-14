var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.HERO_SPAWN
	struct = {
		NetId: 'uint32',
		ClientID: 'int32',
		NetNodeID: 'uint8',
		SkillLevel: 'uint8',
		bitfield: ['bitfield', {
			TeamIsOrder: 1,
			IsBot: 2,
		}],
		BotRank: 'uint8',
		SpawnPositionIndex: 'uint8',
		SkinID: 'int32',
		Name: ['char', 128],
		Skin: ['char', 40],
		DeathDurationRemaining: 'float',
		TimeSinceDeath: 'float',
		CreateHeroDeath: 'uint32',
		bitfield2: ['bitfield', {
			Unknown1: 1,
			Unknown2: 2,
		}],
	}
};
