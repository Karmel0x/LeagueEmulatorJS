import ExtendedPacket from '../ExtendedPacket';


export default class ChangeMissileSpeed extends ExtendedPacket {
	static struct = {
		speed: 'float',
		delay: 'float',
	};
}
