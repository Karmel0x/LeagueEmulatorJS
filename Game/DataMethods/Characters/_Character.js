const _Package = require("../_Package");


/**
 * @abstract
 */
module.exports = class _Character extends _Package {

	static spells = {};


	get model() {
		return this.constructor.name;
	}
};
