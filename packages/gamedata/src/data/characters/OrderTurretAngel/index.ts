
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Nexus from '../_Turret_Nexus/index';
import OrderTurretAngelBasicAttack from './spells/OrderTurretAngelBasicAttack';


export default class OrderTurretAngel extends _Turret_Nexus {

	static spells = {
		[SlotId.a]: OrderTurretAngelBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretAngel;
	}

}
