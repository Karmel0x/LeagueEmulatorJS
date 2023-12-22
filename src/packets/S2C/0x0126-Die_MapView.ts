import ExtendedPacket from '../ExtendedPacket';
import SDeathData from '../sharedstruct/SDeathData';


export default class Die_MapView extends ExtendedPacket {
	static struct = {
		deathData: SDeathData,
	};
}
