
const ExtendWTraits = require('../../Core/ExtendWTraits');
const GameObject = require("../GameObject");
const IMovable = require('../Traits/IMovable');


class Dummytarget extends ExtendWTraits(GameObject, IMovable) {

	constructor(options) {
		super(options);

	}
}

module.exports = Dummytarget;
