import type AttackableUnit from '../../gameobjects/units/attackable-unit';

export class IStat {
	baseValue = 0;
	flatBonus = 0;
	flatPermanent = 0;
	percentBonus = 0;
	percentPermanent = 0;
	minTotal?: number;
	maxTotal?: number;

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
		let total = baseTotalValue + this.flatBonusValue + (baseTotalValue * this.percentBonusValue);

		if (this.minTotal !== undefined)
			total = Math.max(total, this.minTotal);
		if (this.maxTotal !== undefined)
			total = Math.min(total, this.maxTotal);

		return total;
	}

	constructor(baseValue = 0) {
		this.baseValue = baseValue;
	}

	static from(baseValue: Partial<InstanceType<typeof IStat>>) {
		const iStat = new IStat();
		Object.assign(iStat, baseValue);
		return iStat;
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

export class IStatShield {
	minimum = 0;
	maximum = 10000;
	_current = 0;

	get current() {
		return this._current;
	}

	set current(value) {
		if (value < this.minimum)
			value = this.minimum;
		if (value > this.maximum)
			value = this.maximum;

		if (this._current === value)
			return;

		this._current = value;
	}
}
