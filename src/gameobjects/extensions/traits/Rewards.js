

/**
 * Trait for units that will reward on die
 * @mixin
 */
module.exports = class Rewards {

	/**
	 * 
	 * @param {import('../../units/Unit')} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	get rewardExp() { }
	get rewardGold() { }

};
