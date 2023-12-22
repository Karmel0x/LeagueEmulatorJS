import BasePacket from '../BasePacket';

export default class UpdateGameOptions extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			autoAttackEnabled: 1,
		}],
	};
}
