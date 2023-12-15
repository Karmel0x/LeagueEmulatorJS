import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetMaxLevelOverride extends ExtendedPacket {
	static struct = {
		maxLevelOverride: 'uint8',
	};
}
