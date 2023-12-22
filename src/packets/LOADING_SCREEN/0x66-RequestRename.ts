import PrimaryPacket from '../PrimaryPacket';

export default class RequestRename extends PrimaryPacket {
	static struct = {
		playerId: 'int64',
		skinId: 'int32',
		playerName: 'string_',
	};
}
