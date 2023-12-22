import _Package from '../_Package';


/**
 * @abstract
 */
export default class _Character extends _Package {

	static spells = {};
	static stats = {};


	get model() {
		return this.constructor.name;
	}

	get stats() {
		return this.constructor.stats;
	}

}
