import Unit from '../../units/unit';


/**
 * Trait for units that will reward on die
 */
export default class Rewards {
	owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	get rewardExp() { }
	get rewardGold() { }

}
