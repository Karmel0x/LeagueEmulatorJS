import BasePacket from '../BasePacket';

export default class CreateTurret extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		objectName: ['char', 64],//utf-8?
		bitfield: ['bitfield', {
			isTargetable: 1,
			unk1: 2,
			unk2: 3,
		}],
		isTargetableToTeamSpellFlags: 'uint32',
	};
}
