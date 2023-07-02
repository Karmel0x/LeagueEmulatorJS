const _Package = require("../_Package");


/**
 * @abstract
 */
module.exports = class _Character extends _Package {

	static spells = {};
	static stats = {};


	get model() {
		return this.constructor.name;
	}

	get stats() {
		return this.constructor.stats;
	}

};
