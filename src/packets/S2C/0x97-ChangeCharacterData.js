import BasePacket from '../BasePacket.js';


export default class ChangeCharacterData extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			overrideSpells: 1,
			modelOnly: 2,
			replaceCharacterPackage: 4,
		}],
		objId: 'uint32',
		skinId: 'uint32',
		skinName: 'string0',//64
	};
}
