import BasePacket from '../BasePacket.js';

export default class CreateHero extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		clientId: 'int32',
		netNodeId: 'uint8',
		skillLevel: 'uint8',
		bitfield: ['bitfield', {
			teamIsOrder: 1,
			isBot: 2,
		}],
		botRank: 'uint8',
		spawnPosIndex: 'uint8',
		skinId: 'int32',
		objectName: ['char', 128],
		skinName: ['char', 40],
		deathDurationRemaining: 'float',
		timeSinceDeath: 'float',
		createHeroDeath: 'uint32',
		bitfield2: ['bitfield', {
			Unknown1: 1,
			Unknown2: 2,
		}],
	};
}
