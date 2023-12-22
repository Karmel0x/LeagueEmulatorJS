import BasePacket from '../BasePacket';


/**
 * shows sign above source unit health bar
 */
export default class AI_TargetHero extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
