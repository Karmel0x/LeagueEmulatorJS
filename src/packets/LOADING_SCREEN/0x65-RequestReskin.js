import PrimaryPacket from '../PrimaryPacket.js';

export default class RequestReskin extends PrimaryPacket {
	static struct = {
		playerId: 'int64',
		skinId: 'int32',
		skinName: 'string_',
	};
}
