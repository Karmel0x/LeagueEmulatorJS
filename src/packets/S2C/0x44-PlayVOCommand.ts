import BasePacket from '../BasePacket';


export default class PlayVOCommand extends BasePacket {
	static struct = {
		commandId: 'uint32',
		targetId: 'uint32',
		bitfield: ['bitfield', {
			highlightPlayerIcon: 1,
			fromPing: 2,
		}],
	};
}
