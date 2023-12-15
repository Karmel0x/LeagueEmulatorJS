import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetDrawPathMode extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathMode: 'uint8',
		updateRate: 'float',
	};
}
