
const ExtendWTraits = require('../../core/ExtendWTraits');
const GameObject = require("../GameObject");
const IMovable = require('../traits/IMovable');


class Dummytarget extends ExtendWTraits(GameObject, IMovable) {

	/**
	 * 
	 * @param {import('../GameObjects').DummytargetOptions} options 
	 */
	constructor(options) {
		super(options);

	}
}

module.exports = Dummytarget;
