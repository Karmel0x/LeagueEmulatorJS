var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.Barrack_SpawnUnit
	struct = {
		ObjectID: 'uint32',
		ObjectNodeID: 'uint8',
		BarracksNetId: 'uint32',
		WaveCount: 'uint8',
		MinionType: 'uint8',
		DamageBonus: 'int16',
		HealthBonus: 'int16',
		MinionLevel: 'uint8',
	}
};
