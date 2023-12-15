import BasePacket from '../BasePacket.js';

export default class SpectatorDataChunkInfo extends BasePacket {
	static struct = {
		startGameChunkId: 'int32',
		endGameChunkId: 'int32',
	};
}
