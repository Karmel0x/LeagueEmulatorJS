var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.UPDATE_MODEL
	struct = {
		bitfield: ['bitfield', {
			OverrideSpells: 1,
			ModelOnly: 2,
			ReplaceCharacterPackage: 4,
		}],
        ID: 'uint32',
        SkinID: 'uint32',
        SkinName: 'string0',//64
	}
};
