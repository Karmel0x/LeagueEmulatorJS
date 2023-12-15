import BasePacket from '../BasePacket.js';

export default class UpdateGameOptions extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			autoAttackEnabled: 1,
		}],
	};
}
