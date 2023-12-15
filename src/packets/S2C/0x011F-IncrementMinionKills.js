import ExtendedPacket from '../ExtendedPacket.js';


export default class IncrementMinionKills extends ExtendedPacket {
	static struct = {
		playerNetId: 'uint32',
	};
}
