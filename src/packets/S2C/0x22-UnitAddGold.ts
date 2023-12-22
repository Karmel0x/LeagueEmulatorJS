import BasePacket from '../BasePacket';


export default class UnitAddGold extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
		goldAmount: 'float',
	};
}
