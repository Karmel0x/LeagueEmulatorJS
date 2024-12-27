import type AttackableUnit from '../../units/attackable-unit';

export class IStat {
	baseValue = 0;
	flatBonus = 0;
	flatPermanent = 0;
	percentBonus = 0;
	percentPermanent = 0;

	get baseTotalValue() {
		return this.baseValue;
	}

	get flatBonusValue() {
		return this.flatBonus + this.flatPermanent;
	}

	get percentBonusValue() {
		return this.percentBonus + this.percentPermanent;
	}

	get total(): number {
		const baseTotalValue = this.baseTotalValue;
		return baseTotalValue + this.flatBonusValue + (baseTotalValue * this.percentBonusValue / 100);
	}

	constructor(baseValue: number | object = 0) {
		if (typeof baseValue === 'object') {
			Object.assign(this, baseValue);
		} else {
			this.baseValue = baseValue;
		}
	}
}

export class IStatLevelable extends IStat {
	perLevel = 0;

	get levelValue() {
		return this.perLevel * this.owner.progress.level;//(this.owner.progress.level - 1);
	}

	get baseTotalValue() {
		return this.baseValue + this.levelValue;
	}

	readonly owner;

	constructor(owner: AttackableUnit, baseValue: number = 0, perLevel: number = 0) {
		super(baseValue);
		this.perLevel = perLevel;
		this.owner = owner;
	}
}

export class IStatStateable extends IStatLevelable {
	minimum = 0;
	_current = this.total;

	get current() {
		return this._current;
	}

	set current(value) {

		if (value < this.minimum)
			value = this.minimum;
		if (value > this.total)
			value = this.total;

		this._current = value;
	}
}
