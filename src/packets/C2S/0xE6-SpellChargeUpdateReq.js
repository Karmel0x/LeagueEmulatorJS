import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class SpellChargeUpdateReq extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isSummonerSpellBook: 1,
			forceStop: 2,
		}],
		slot: 'uint8',
		position: SVector3,
	};
}
