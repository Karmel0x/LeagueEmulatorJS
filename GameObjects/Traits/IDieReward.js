

/**
 * Interface for units that can die.
 * @param {GameObject} I 
 */
module.exports = (I) => class IDieReward extends I {

	get rewardExp(){}
	get rewardGold(){}
	
};
