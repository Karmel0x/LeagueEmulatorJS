import BasePacket from '../BasePacket.js';

export default class EndOfGameEvent extends BasePacket {
	static struct = {
		teamIsOrder: 'bool',
	};
}
