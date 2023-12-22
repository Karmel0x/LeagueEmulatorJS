import BasePacket from '../BasePacket';

export default class SpectatorDataChunkInfo extends BasePacket {
	static struct = {
		startGameChunkId: 'int32',
		endGameChunkId: 'int32',
	};
}
