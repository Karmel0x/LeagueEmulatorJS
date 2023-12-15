import ExtendedPacket from '../ExtendedPacket.js';


export default class ChangeMissileSpeed extends ExtendedPacket {
	static struct = {
		speed: 'float',
		delay: 'float',
	};
}
