import ExtendedPacket from '../ExtendedPacket';


export default class UpdateDeathTimer extends ExtendedPacket {
	static struct = {
		deathDuration: 'float',
	};
}
