
/**
 * Trait for units which holds character (model, spells, ..)
 * @class
 * @param {GameObject} I
 */
module.exports = (I) => class ICharacter extends I {

	_character = {};
	get character(){
		return this._character;
	}
	set character(char){
		if(typeof char == 'string')
			char = require('../../Game/LeagueData/Characters/' + char);

		if(typeof char == 'function')
			char = new char(this);

		this._character = char;
	}

	constructor(options){
		super(options);

		this.character = options.character;
	}
	
};
