const _Minion_MechCannon = require("../_Minion_MechCannon");


module.exports = class Blue_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack: require('./Spells/Blue_Minion_MechCannonBasicAttack'),
		BasicAttack2: require('./Spells/Blue_Minion_MechCannonBasicAttack2'),
		CritAttack: require('./Spells/Blue_Minion_MechCannonCritAttack'),
	};

};
