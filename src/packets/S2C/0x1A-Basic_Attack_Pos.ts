import BasePacket from '../BasePacket';
import SBasicAttackData from '../sharedstruct/SBasicAttackData';
import SVector2 from '../sharedstruct/SVector2';


export default class Basic_Attack_Pos extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
		position: SVector2,
	};
}
