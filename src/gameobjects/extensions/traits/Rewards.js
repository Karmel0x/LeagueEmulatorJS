

/**
 * Trait for units that will reward on die
 * @mixin
 */
export default class Rewards {

	/**
	 * 
	 * @param {import('../../units/Unit.js').default} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	get rewardExp() { }
	get rewardGold() { }

}
