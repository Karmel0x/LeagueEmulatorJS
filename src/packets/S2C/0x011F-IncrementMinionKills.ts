import ExtendedPacket from '../ExtendedPacket';


export default class IncrementMinionKills extends ExtendedPacket {
	static struct = {
		playerNetId: 'uint32',
	};
}
