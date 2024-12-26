
import _Character from '../../game/basedata/characters/character';
import { EventEmitter } from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import MovingUnit, { IMovingUnit, MovingUnitEvents } from '../extensions/moving/unit';
import Unit, { UnitEvents, UnitOptions } from './unit';
import Attackable, { AttackableEvents, IAttackable } from '../extensions/combat/attackable';
import { SlotId } from '../../constants/slot-id';
import Inventory from '../extensions/traits/inventory';


export type AttackableUnitOptions = UnitOptions & {

};

export type AttackableUnitEvents = UnitEvents & AttackableEvents & MovingUnitEvents & {

}

export default class AttackableUnit extends Unit implements IMovingUnit, IAttackable {
	static initialize(options: AttackableUnitOptions) {
		return super.initialize(options) as AttackableUnit;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<AttackableUnitEvents>;

	moving!: MovingUnit;
	combat!: Attackable;
	inventory!: Inventory;

	loader(options: UnitOptions) {
		this.moving = new MovingUnit(this);
		this.combat = new Attackable(this);
		this.inventory = new Inventory(this);

		this.eventEmitter.on('spellCasting', (spellData) => {
			if (!spellData.canMoveWhenCast)
				this.moving.waypointsHalt = true;
		});

		this.eventEmitter.on('spellCastingEnd', (spellData) => {
			if (!spellData.canMoveWhenCast)
				this.moving.waypointsHalt = false;
		});

		super.loader(options);
	}

	onDie(source: AttackableUnit) {

	}

	/**
	 * Returns if unit is able to move
	 */
	isAbleForMoving() {
		if (!this.moving)
			return false;

		if (this.combat.died)
			return false;

		return true;
	}

	/**
	 * Returns if unit is able to attack
	 */
	isAbleForAttacking() {
		if (!this.slots[SlotId.A])
			return false;

		if (this.combat.died)
			return false;

		return true;
	}

}
