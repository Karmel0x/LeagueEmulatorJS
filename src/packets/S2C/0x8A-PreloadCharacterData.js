import BasePacket from '../BasePacket.js';

export default class PreloadCharacterData extends BasePacket {
	static struct = {
		skinId: 'int32',
		skinName: 'string0',//64
	};
}
