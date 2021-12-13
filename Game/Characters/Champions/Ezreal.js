const _Champion = require("./_Champion");

const SpellsEzreal = require('../../Spells/Ezreal');


module.exports = class Ezreal extends _Champion {
	//PackageHash = 2618078626;//[Character]Ezreal00
	attackWindupPercent = 18.839;
	constructor(parent){
		super(parent);

		this.spells = new SpellsEzreal(this);
		//{
			//62: new Passive(this),
			//64-81: Attack?
		//};
	}
};
