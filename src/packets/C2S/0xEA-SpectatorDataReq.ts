import BasePacket from '../BasePacket';

export default class SpectatorDataReq extends BasePacket {
	static struct = {
		sendMetaData: 'uint8',
		jumpToLatest: 'uint8',
		startChunkId: 'int32',
		startKeyFrameId: 'int32',
	};
}
