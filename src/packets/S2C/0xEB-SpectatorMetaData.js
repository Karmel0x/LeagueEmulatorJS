import BasePacket from '../BasePacket.js';

export default class SpectatorMetaData extends BasePacket {
	static struct = {
		jsonMetaData: 'string',
	};
}
