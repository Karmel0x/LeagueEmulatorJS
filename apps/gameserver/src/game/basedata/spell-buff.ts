
import type AttackableUnit from "../../gameobjects/units/attackable-unit";
import Spell from "./spell";


export default class SpellBuff extends Spell {

	/**
	 * @virtual
	 */
	buffActivate(owner: AttackableUnit, attacker?: AttackableUnit, buffVars?: any) {

	}

	/**
	 * @virtual
	 */
	buffDeactivate(owner: AttackableUnit, attacker?: AttackableUnit, buffVars?: any) {

	}

	/**
	 * @virtual
	 */
	buffUpdateActions(owner: AttackableUnit) {

	}

}
