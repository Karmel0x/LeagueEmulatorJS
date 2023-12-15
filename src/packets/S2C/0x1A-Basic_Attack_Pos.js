import BasePacket from '../BasePacket.js';
import SBasicAttackData from '../sharedstruct/SBasicAttackData.js';
import SVector2 from '../sharedstruct/SVector2.js';


export default class Basic_Attack_Pos extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
		position: SVector2,
	};
}
