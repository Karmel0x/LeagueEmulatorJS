import Unit from '../../units/Unit';


/**
 * Trait for units that will reward on die
 */
export default class Rewards {

	constructor(owner: Unit) {
		this.owner = owner;
	}

	get rewardExp() { }
	get rewardGold() { }

}
