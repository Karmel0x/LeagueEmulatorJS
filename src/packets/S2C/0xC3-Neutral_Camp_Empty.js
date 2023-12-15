import BasePacket from '../BasePacket.js';


export default class Neutral_Camp_Empty extends BasePacket {
	static struct = {
		killerNetId: 'uint32',
		campIndex: 'int32',
		timerType: 'int32',
		timerExpire: 'float',
		bitfield: ['bitfield', {
			doPlayVO: 1,
		}],
	};
}
