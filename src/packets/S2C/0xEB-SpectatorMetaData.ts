import BasePacket from '../BasePacket';

export default class SpectatorMetaData extends BasePacket {
	static struct = {
		jsonMetaData: 'string',
	};
}
