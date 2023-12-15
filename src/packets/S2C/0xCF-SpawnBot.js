import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';

export default class SpawnBot extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		botRank: 'uint8',
		team: 'uint16',//(bitfield & 0x1FF)
		skinId: 'int32',
		objectName: ['char', 64],
		skinName: 'string0',//64
	};
}
