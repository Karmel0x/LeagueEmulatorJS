import BasePacket from '../BasePacket.js';
import SVector2 from '../sharedstruct/SVector2.js';

export default class HeroReincarnate extends BasePacket {
	static struct = {
		position: SVector2,
		parValue: 'float',
	};
}
