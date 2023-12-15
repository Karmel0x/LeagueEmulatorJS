import PrimaryPacket from '../PrimaryPacket.js';

export default class RequestRename extends PrimaryPacket {
	static struct = {
		playerId: 'int64',
		skinId: 'int32',
		playerName: 'string_',
	};
}
