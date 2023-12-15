import BasePacket from '../BasePacket.js';

export default class UnitAddEXP extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		expAmount: 'float',
	};
}
