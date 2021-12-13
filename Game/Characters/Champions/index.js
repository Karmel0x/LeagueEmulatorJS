
module.exports = class CharactersChampions {
	static list = {
		Ezreal:		require('./Ezreal'),
		Yasuo:		require('./Yasuo'),
	};
	
	static create(parent, characterName){
		if(!CharactersChampions.list[characterName])
			return;

		var character = new CharactersChampions.list[characterName](parent);
		return character;
	}
};
