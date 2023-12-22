import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetDrawPathMode extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathMode: 'uint8',
		updateRate: 'float',
	};
}
