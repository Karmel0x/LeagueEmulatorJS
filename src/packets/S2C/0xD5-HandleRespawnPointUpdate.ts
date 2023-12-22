import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

export default class HandleRespawnPointUpdate extends BasePacket {
	static struct = {
		tespawnPointCommand: 'uint8',
		respawnPointUiId: 'uint8',
		team: 'uint32',
		clientId: 'int32',
		position: SVector3,
	};
}
