import BasePacket from '../BasePacket.js';
import SDeathData from '../sharedstruct/SDeathData.js';


export default class Hero_Die extends BasePacket {
	static struct = {
		deathData: SDeathData,
	};
}
