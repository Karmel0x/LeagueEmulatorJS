import BasePacket from '../BasePacket';

export default class UnitAddEXP extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		expAmount: 'float',
	};
}
