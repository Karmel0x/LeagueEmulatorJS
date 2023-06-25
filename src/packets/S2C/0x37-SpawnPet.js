const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class SpawnPet extends BasePacket {
	static struct = {
		ownerNetId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		castSpellLevelPlusOne: 'int32',
		duration: 'float',
		teamId: 'uint32',
		damageBonus: 'int32',
		healthBonus: 'int32',
		objectName: ['char', 128],
		skinName: ['char', 32],
		skinId: 'int32',
		buffName: ['char', 64],
		cloneId: 'uint32',
		bitfield: ['bitfield', {
			cloneInventory: 1,
			showMinimapIconIfClone: 2,
			disallowPlayerControl: 4,
			doFade: 8,
		}],
		aiScript: 'string0',//32
	}
};
