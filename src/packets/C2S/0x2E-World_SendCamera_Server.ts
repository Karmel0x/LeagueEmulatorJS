import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

export default class World_SendCamera_Server extends BasePacket {
	static struct = {
		cameraPosition: SVector3,
		cameraDirection: SVector3,
		clientId: 'int32',
		syncId: 'uint8',
	};
}
