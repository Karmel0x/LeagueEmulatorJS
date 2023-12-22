import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

export default class SpawnMinion extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		ownerNetId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		skinId: 'int32',
		cloneNetId: 'uint32',
		team: 'uint16',
		bitfield: ['bitfield', {
			ignoreCollision: 1,
			isWard: 2,
			isLaneMinion: 4,
			isBot: 8,
			isTargetable: 16,
		}],
		isTargetableToTeamSpellFlags: 'uint32',
		visibilitySize: 'float',
		objectName: ['char', 64],
		skinName: ['char', 64],
		initialLevel: 'uint16',
		onlyVisibleToNetId: 'uint32',
	};
}
