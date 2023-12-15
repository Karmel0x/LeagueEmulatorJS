import ExtendedPacket from '../ExtendedPacket.js';
import SDeathData from '../sharedstruct/SDeathData.js';


export default class Die_MapView extends ExtendedPacket {
	static struct = {
		deathData: SDeathData,
	};
}
