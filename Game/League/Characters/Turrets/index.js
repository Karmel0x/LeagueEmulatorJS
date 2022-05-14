
module.exports = class CharactersTurrets {
	static list = {
		Basicturret:		require('./Basicturret'),
	};
	
	static create(parent, modelName){
		//if(!CharactersTurrets.list[modelName])
		//	return;

		var character = new (CharactersTurrets.list[modelName] || CharactersTurrets.list['Basicturret'])(parent);
		character.modelName = modelName;
		return character;
	}
};
