var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		OwnerNetId: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		CastSpellLevelPlusOne: 'int32',
		Duration: 'float',
		TeamID: 'uint32',
		DamageBonus: 'int32',
		HealthBonus: 'int32',
		Name: ['char', 128],
		Skin: ['char', 32],
		SkinID: 'int32',
		BuffName: ['char', 64],
		CloneID: 'uint32',
		bitfield: ['bitfield', {
			CloneInventory: 1,
			ShowMinimapIconIfClone: 2,
			Unknown4: 4,
			DoFade: 8,
		}],
		AIscript: 'string0',//32
	}
};
