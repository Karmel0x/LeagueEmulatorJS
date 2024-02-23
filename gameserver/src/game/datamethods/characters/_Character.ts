import _Package from '../_Package';


/**
 * @abstract
 */
export default class _Character extends _Package {

	static spells = {};
	static stats = {};

	get base() {
		return this.constructor as typeof _Character;
	}

	get model() {
		return this.base.name;
	}

	get stats() {
		return this.base.stats;
	}

}
