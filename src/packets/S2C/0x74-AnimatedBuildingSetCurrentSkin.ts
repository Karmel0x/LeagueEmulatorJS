import BasePacket from '../BasePacket';

export default class AnimatedBuildingSetCurrentSkin extends BasePacket {
	static struct = {
		team: 'uint8',
		skinId: 'uint32',
	};
}
