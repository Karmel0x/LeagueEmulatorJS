import ExtendedPacket from '../ExtendedPacket.js';


export default class UpdateDeathTimer extends ExtendedPacket {
	static struct = {
		deathDuration: 'float',
	};
}
