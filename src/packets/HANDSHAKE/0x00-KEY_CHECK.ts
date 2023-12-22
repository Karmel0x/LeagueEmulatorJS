import PrimaryPacket from '../PrimaryPacket';

export default class KEY_CHECK extends PrimaryPacket {
	static struct = {
		partialKey: ['uint8', 3],

		clientId: 'uint32',
		playerId: 'uint64',
		versionNumber: 'uint32',
		checksum: 'uint64',
		dummy1: 'uint32',
	};
}
