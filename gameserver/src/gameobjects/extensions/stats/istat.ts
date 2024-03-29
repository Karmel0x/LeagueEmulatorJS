import Unit from '../../units/unit';

export class IStat {
	baseValue = 0;
	flatBonus = 0;
	flatBonus2 = 0;
	percentBonus = 0;
	percentBonus2 = 0;

	get total(): number {
		return this.baseValue + (this.flatBonus + this.flatBonus2) + (this.baseValue * (this.percentBonus + this.percentBonus2) / 100);
	}

	constructor(baseValue: number | object = 0) {
		if (typeof baseValue == 'object') {
			Object.assign(this, baseValue);
		} else {
			this.baseValue = baseValue;
		}
	}
}

export class IStatLevelable extends IStat {
	perLevel = 0;

	get levelValue() {
		return this.perLevel * (this.owner.progress.level - 1);
	}

	get total(): number {
		let baseValueWithLevel = this.baseValue + this.levelValue;
		return baseValueWithLevel + (this.flatBonus + this.flatBonus2) + (baseValueWithLevel * (this.percentBonus + this.percentBonus2) / 100);
	}

	owner;

	constructor(owner: Unit, baseValue: number = 0, perLevel: number = 0) {
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
