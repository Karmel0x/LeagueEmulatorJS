import BasePacket from '../BasePacket.js';

export default class AnimatedBuildingSetCurrentSkin extends BasePacket {
	static struct = {
		team: 'uint8',
		skinId: 'uint32',
	};
}
