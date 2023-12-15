import BasePacket from '../BasePacket.js';


export default class InstantStop_Attack extends BasePacket {
	static struct = {
		missileNetId: 'uint32',
		flags: ['bitfield', {
			keepAnimating: 1,
			destroyMissile: 2,
			overrideVisibility: 4,
			isSummonerSpell: 8,
			forceDoClient: 16,
		}],
	};
}
