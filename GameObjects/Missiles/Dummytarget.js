const { Vector2 } = require("three");

const ExtendWTraits = require('../../Core/ExtendWTraits');
const GameObject = require("../GameObject");
const IMovable = require('../Traits/IMovable');


class Dummytarget extends ExtendWTraits(GameObject, IMovable)  {

	constructor(...args){
		super(...args);
		
	}
}

module.exports = Dummytarget;
