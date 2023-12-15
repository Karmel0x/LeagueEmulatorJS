import BasePacket from '../BasePacket.js';


export default class UnitAddGold extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
		goldAmount: 'float',
	};
}
