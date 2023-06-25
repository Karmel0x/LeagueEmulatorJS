
class IStat {
	baseValue = 0;
	flatBonus = 0;
	flatBonus2 = 0;
	percentBonus = 0;
	percentBonus2 = 0;

	/**
	 * @returns {number} total calculated value
	 */
	get total() {
		return this.baseValue + (this.flatBonus + this.flatBonus2) + (this.baseValue * (this.percentBonus + this.percentBonus2) / 100);
	}

	/**
	 * 
	 * @param {number | Object} baseValue 
	 */
	constructor(baseValue = 0) {
		if (typeof baseValue == 'object') {
			Object.assign(this, baseValue);
		} else {
			this.baseValue = baseValue;
		}
	}
}

class IStatLevelable extends IStat {
	perLevel = 0;

	get levelValue() {
		return this.perLevel * (this.owner.level - 1);
	}

	/**
	 * @returns {number} total calculated value
	 */
	get total() {
		var baseValueWithLevel = this.baseValue + this.levelValue;
		return baseValueWithLevel + (this.flatBonus + this.flatBonus2) + (baseValueWithLevel * (this.percentBonus + this.percentBonus2) / 100);
	}

	constructor(owner, baseValue = 0, perLevel = 0) {
		super(baseValue);
		this.perLevel = perLevel;
		this.owner = owner;
	}
}

class IStatStateable extends IStatLevelable {
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

module.exports = { IStat, IStatLevelable, IStatStateable };
