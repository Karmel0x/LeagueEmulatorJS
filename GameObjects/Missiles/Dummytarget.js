const { Vector2 } = require("three");

const BaseInterface = require('../../Core/BaseInterface');
const GameObject = require("../GameObject");
const IMovable = require('../Interfaces/IMovable');


class Dummytarget extends BaseInterface(GameObject, IMovable)  {

	constructor(...args){
		super(...args);
		
	}
}

module.exports = Dummytarget;
