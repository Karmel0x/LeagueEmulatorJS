
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

	constructor(...args){
		super(...args);

		this.character = args[0].character;
	}
	
};
