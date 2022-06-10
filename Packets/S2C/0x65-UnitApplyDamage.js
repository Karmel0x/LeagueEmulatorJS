const BasePacket = require('../BasePacket');


module.exports = class UnitApplyDamage extends BasePacket {
	static struct = {
		damageResultType: 'uint8',
		dummy: 'uint8',
		damageType: 'uint8',
		damage: 'float',
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
	}
};
