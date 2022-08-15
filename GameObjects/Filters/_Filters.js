
module.exports = (I) => class _Filters extends I {

	/**
	 * @param {Array.<GameObject>} targets
	 * @param {Array.<String>|String} types (Minion/Player/...)
	 * @returns {Array.<GameObject>}
	 */
	static filterByType(targets, types){
		types = typeof types == 'string' ? [types] : types;
		return targets.filter(targets => types.includes(targets.type));
	}

	/**
	 * @param {Array.<GameObject>} targets
	 * @param {Array.<String>|String} types (Minion/Player/...)
	 */
	static sortByType(targets, types){
		types = typeof types == 'string' ? [types] : types;
		targets.sort((a, b) => {
			return types.indexOf(a.type) - types.indexOf(b.type);
		});
	}


	constructor(gameObject){
		super(...arguments);
		this.gameObject = gameObject;
	}

	filterByType(targets, types){
		return this.constructor.filterByType(targets, types);
	}

	sortByType(targets, types){
		return this.constructor.sortByType(targets, types);
	}

};
