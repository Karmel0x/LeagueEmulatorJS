
module.exports = class CharactersMinions {
	static list = {
		Basic:		require('./Basic'),
		MechCannon:	require('./MechCannon'),
		MechMalee:	require('./MechMalee'),
		Wizard:		require('./Wizard'),
	};

	static create(parent, characterName, team = ''){
		if(!CharactersMinions.list[characterName])
			return;

		var character = new CharactersMinions.list[characterName](parent);
		character.model = team.toCapitalCase() + '_Minion_' + characterName;
		return character;
	}
};
