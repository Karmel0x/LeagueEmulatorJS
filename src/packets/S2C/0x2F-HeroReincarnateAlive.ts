import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';

export default class HeroReincarnateAlive extends BasePacket {
	static struct = {
		position: SVector2,
		parValue: 'float',
	};
}
