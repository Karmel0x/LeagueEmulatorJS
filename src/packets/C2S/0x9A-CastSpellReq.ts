import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';


export default class CastSpellReq extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isSummonerSpellBook: 1,
			isHudClickCast: 2,
		}],
		slot: 'uint8',
		position: SVector2,
		endPosition: SVector2,
		targetNetId: 'uint32',
	};
}
