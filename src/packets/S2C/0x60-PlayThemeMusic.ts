import BasePacket from '../BasePacket';

export default class PlayThemeMusic extends BasePacket {
	static struct = {
		sourceNetId: 'uint32',
		musicId: 'uint32',
	};
}
