const BasePacket = require('../BasePacket');


/**
 * necessary packet to spawn minion
 */
module.exports = class Barrack_SpawnUnit extends BasePacket {
	static struct = {
		objectId: 'uint32',
		objectNodeId: 'uint8',
		barracksNetId: 'uint32',
		waveCount: 'uint8',
		minionType: 'uint8',
		damageBonus: 'int16',
		healthBonus: 'int16',
		minionLevel: 'uint8',
	}
};
