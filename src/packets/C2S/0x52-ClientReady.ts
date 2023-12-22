import BasePacket from '../BasePacket';
import STipConfig from '../sharedstruct/STipConfig';

export default class ClientReady extends BasePacket {
	static struct = {
		dummy1: ['char', 4],
		tipConfig: STipConfig,
		dummy2: ['char', 8],
	};
}
