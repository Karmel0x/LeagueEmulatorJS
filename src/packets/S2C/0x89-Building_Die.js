import BasePacket from '../BasePacket.js';


export default class Building_Die extends BasePacket {
	static struct = {
		attackerNetId: 'uint32',
		lastHeroNetId: 'uint32',
	};
}
