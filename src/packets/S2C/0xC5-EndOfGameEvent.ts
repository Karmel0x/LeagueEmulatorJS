import BasePacket from '../BasePacket';

export default class EndOfGameEvent extends BasePacket {
	static struct = {
		teamIsOrder: 'bool',
	};
}
