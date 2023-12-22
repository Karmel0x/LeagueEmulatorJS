import BasePacket from '../BasePacket';


export default class ForceDead extends BasePacket {
	static struct = {
		deathDuration: 'float',
	};
}
