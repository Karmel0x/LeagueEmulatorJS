import type Unit from '../../units/unit';


/**
 * Trait for units that will reward on die
 */
export default class Rewards {
	readonly owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	get rewardExp() {
		return 0;
	}
	get rewardGold() {
		return 0;
	}

}
