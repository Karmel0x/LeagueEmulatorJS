import BasePacket from '../BasePacket';
import SDeathData from '../sharedstruct/SDeathData';


export default class Hero_Die extends BasePacket {
	static struct = {
		deathData: SDeathData,
	};
}
