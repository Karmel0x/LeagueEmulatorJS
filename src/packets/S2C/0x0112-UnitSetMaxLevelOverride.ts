import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetMaxLevelOverride extends ExtendedPacket {
	static struct = {
		maxLevelOverride: 'uint8',
	};
}
