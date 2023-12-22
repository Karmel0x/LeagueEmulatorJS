import BasePacket from '../BasePacket';
import SBasicAttackData from '../sharedstruct/SBasicAttackData';


export default class Basic_Attack extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
	};

	/** @//type {import('../sharedstruct/SBasicAttackData.js').TBasicAttackData} */
	attack = {
		targetNetId: 0,
		extraTime: 0,
		missileNextId: 0,
		attackSlot: 0,
		targetPosition: {
			x: 0,
			y: 0,
			z: 0,
		},
	};

}
